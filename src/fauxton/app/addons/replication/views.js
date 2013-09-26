// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

define([
       "app",
       "api",
       "modules/fauxton/components",
       "addons/replication/resources"
],
function(app, FauxtonAPI, Components, replication) {
  var View = {},
  Events ={},
  pollingInfo ={
    rate: 5,
    intervalId: null
  };

  _.extend(Events, Backbone.Events);

  // NOTES: http://wiki.apache.org/couchdb/Replication

  // Replication form view is huge
  // -----------------------------------
  // beforeRender:  add the status table
  // disableFields:  disable non active fields on submit 
  // enableFields:  enable field when radio btns are clicked
  // establish:  get the DB list for autocomplete
  // formValidation:  make sure fields aren't empty
  // showProgress:  make a call to active_tasks model and show only replication types.  Poll every 5 seconds. (make this it's own view)
  // startReplication:  saves to the model, starts replication
  // submit:  form submit handler
  // swapFields:  change to and from target
  // toggleAdvancedOptions:  toggle advanced

  View.ReplicationForm = FauxtonAPI.View.extend({
    template: "addons/replication/templates/form",
    events:  {
      "submit #replication": "validate",
      "change .next": "nextStep",
      "change #create_target input[type='radio']": "showTargetForm",
      "click #create_target label": "createTargetActiveState"
    },
    initialize: function(options){
      this.status = options.status;
      this.selectedDB = options.selectedDB;
      this.newRepModel = new replication.Replicate({});
    },
    beforeRender:  function(){
      this.insertView("#replicationStatus", new View.ReplicationList({
        collection: this.status
      }));

      this.insertView("#source_form",new View.LocalRemoteTabs({
        selectedDB: this.selectedDB ||"",
        type: "source",
        step: "2"
      }));
    },
    cleanup: function(){
      clearInterval(pollingInfo.intervalId);
    },
    createTargetActiveState: function(e){
      var $currentTarget = this.$(e.currentTarget);
      $currentTarget.parents("#create_target").find('.active').removeClass('active');
      $currentTarget.addClass('active');
    },
    enableFields: function(){
      this.$el.find('input','select').attr('disabled',false);
    },
    disableFields: function(){
      this.$el.find('input[type="text"]:hidden','select:hidden').not("[type='radio']").attr('disabled',true);
    },
    establish: function(){
      return [ this.collection.fetch(), this.status.fetch()];
    },
    validationCheck: function(e){
      var $remote = this.$el.find('input:visible').not('[data-validation="optional"]'),
      error = false;
      for(var i=0; i<$remote.length; i++){
        if ($remote[i].value =="http://" || $remote[i].value ===""){
          error = true;
        }
      }
      return error;
    },
    nextStep: function(e){
      this.$("#"+this.$(e.currentTarget).attr('data-next-step')).removeClass('hide');
    },
    serialize: function(){
      return {
        host:  app.host+"/"
      };
    },
    showTargetForm: function(e){
      if (this.targetForm){ this.targetForm.remove();}
      var targetView = this.$('[name="create_target"]:checked').val()==="true"? "CreateTarget": "LocalRemoteTabs";
      this.targetForm = this.insertView("#target_form",new View[targetView]({
                          type: "target",
                          step: "4"
                        }));
      this.targetForm.render();
      this.nextStep(e);
    },
    startReplication: function(json){
      var that = this;
      this.newRepModel.save(json,{
        success: function(resp){
          var notification = FauxtonAPI.addNotification({
            msg: "Replication from "+resp.get('source')+" to "+ resp.get('target')+" has begun.",
            type: "success",
            clear: true
          });
          that.updateButtonText(false);
          Events.trigger('update:tasks');
        },
        error: function(model, xhr, options){
          var errorMessage = JSON.parse(xhr.responseText);
          var notification = FauxtonAPI.addNotification({
            msg: errorMessage.reason,
            type: "error",
            clear: true
          });
          that.updateButtonText(false);
        }
      });
      this.enableFields();
    },	
    updateButtonText: function(wait){
      var $button = this.$('#replication button[type=submit]');
      if(wait){
        $button.text('Starting replication...').attr('disabled', true);
      } else {
        $button.text('Replication').attr('disabled', false);
      }
    },
    validate: function(e){
      e.preventDefault();
      var notification;

      if (this.validationCheck()){
        notification = FauxtonAPI.addNotification({
          msg: "Please enter every field.",
          type: "error",
          clear: true
        });
      } else if (this.$('input#to_name').is(':visible') && !this.$('input[name=create_target]').is(':checked')){
        var alreadyExists = this.collection.where({"name":this.$('input#to_name').val()});
        if (alreadyExists.length === 0){
          notification = FauxtonAPI.addNotification({
            msg: "This database doesn't exist. Select New Database if you want to create it.",
            type: "error",
            clear: true
          });
        }else{
          this.submit(e);
        }
      }else{
        this.submit(e);
      }
    },
    submit: function(e){
      this.disableFields();
      var formData = this.scrubFormData(e),
          that = this;
      this.updateButtonText(true);
      if (this.collection.where({"name":"_replicator"}).length !==0){
        this.startReplication(formData);
      } else {
        var db = new this.collection.model();
        db.save({
          id: "_replicator",
          name: "_replicator"
        }).done(function(){
          that.startReplication(formData);
        });
      }
     
    },
    setAuthHeaders: function(source,user,pass){
      var basicHeader = new FauxtonAPI.session.createBasicAuthHeader(user,pass),
          json = {};
          json.url = app.host+"/"+source;
          json.headers = {
              "Authorization": basicHeader.basicAuthHeader
          };
      return json;
    },
    scrubFormData: function(e){
      var data = {},
          scrub = {};
      _.map(this.$(e.currentTarget).serializeArray(), function(formData){
        if(formData.value !== ''){
          //clean booleans & whitespaces
          if (formData.name == "_id" || formData.name == "create_target" ){
            data[formData.name] = (formData.value ==="true"? true: formData.value.replace(/\s/g, '').toLowerCase());
          } else {
          //Lotta stuff needs to be scrubbed before it's in proper json to submit
            scrub[formData.name] = formData.value.replace(/\s/g, '').toLowerCase();
          }
        }
      });

      //username & password for source
      if ( scrub.user_source && scrub.password_source){
        data.source = this.setAuthHeaders(scrub.source, scrub.user_source, scrub.password_source);
      } else {
        data.source = scrub.source;
      }

      //username & password for target
      if ( scrub.user_target && scrub.password_target){
        data.target = this.setAuthHeaders(scrub.target, scrub.user_target, scrub.password_target);
      } else {
        data.target = scrub.target;
      }

      return data;
    }
  });

  View.AdvancedOptions = FauxtonAPI.View.extend({
    className: "authenticate",
    template: "addons/replication/templates/options",
    events: {
      "click .options": "toggleAdvancedOptions",
    },
    toggleAdvancedOptions:  function(e){
      this.$(e.currentTarget).toggleClass("off");
      this.$('.advancedOptions').toggle("hidden").find('input').removeAttr('disabled');
    }
  });


  View.LocalRemoteTabs = FauxtonAPI.View.extend({
    template: "addons/replication/templates/localremotetabs",
    events:  {
      "click .nav-tabs a": "tabs",
      "change .permission": "showAuth"
    },
    afterRender: function(){
      this.dbSearchTypeahead = new Components.DbSearchTypeahead({
        dbLimit: 30,
        el: "input.auto",
        updater: function(item){
            return app.host+"/"+item;
        }
      });
      this.dbSearchTypeahead.render();

      this.preselectedDatabase();
    },
    initialize: function(options){
      this.type = options.type;
      this.step = options.step;
      this.selected = options.selectedDB || "";
    },
    preselectedDatabase: function(){
      //if selected database is passed through from the _all_dbs page
      if (this.selected){
        this.$('input.auto').val(this.selected);
        this.showAuthFields();
      }
    },
    showAdvancedOptions:  function(e){
      if (this.advancedOptions){ this.advancedOptions.remove();}
        this.advancedOptions = this.insertView("#options-here", new View.AdvancedOptions({}));
        this.advancedOptions.render();
    },
    showAuthFields: function(e){
      var dataAuthSelector = this.$('input.auto').attr('name'),
          autharea = ".authArea_"+dataAuthSelector,
          nextStep = this.step;

      if (this[dataAuthSelector]){ this[dataAuthSelector].remove();}

      this[dataAuthSelector] = this.insertView(autharea, new View.AuthFields({
                                type: dataAuthSelector,
                                step: nextStep }));
      this[dataAuthSelector].render();
    },
    showAuth: function(e){
      if (this.$(e.currentTarget).attr('name') === "source"){
        this.showAdvancedOptions(e);
      }
      this.showAuthFields(e);
    },
    tabs: function(e){
      e.preventDefault();
      var $currentTarget = this.$(e.currentTarget),
          getTabID = "#"+$currentTarget.attr('data-tab');

      $currentTarget.parents('ul').find('.active').removeClass('active');
      $currentTarget.parents('li').addClass('active');

      $(getTabID).parents('.tab-content').find('.active').removeClass('active');
      $(getTabID).addClass('active');
    },
    serialize: function(){
      return {
        step: this.step,
        type: this.type
      };
    }
  });

  View.CreateTarget = FauxtonAPI.View.extend({
    template: "addons/replication/templates/newdatabase",
    events:  {
      "click .nav-tabs a": "tabs",
      "change .permission": "showAuth"
    },
    initialize: function(options){
      this.type = options.type;
      this.step = options.step;
    },
    showAuthFields: function(e){
      var dataAuthSelector = this.$(e.currentTarget).attr('name'),
          autharea = ".authArea_"+dataAuthSelector;

      if (this[dataAuthSelector]){ this[dataAuthSelector].remove();}

      this[dataAuthSelector] = this.insertView(autharea, new View.AuthFields({
                                type:dataAuthSelector,
                                step:"4" 
                               }));
      this[dataAuthSelector].render();
    },
    showAuth: function(e){
      if (this.$(e.currentTarget).attr('name') === "source"){
        this.showAdvancedOptions(e);
      }
      this.showAuthFields(e);
    },
    tabs: function(e){
      e.preventDefault();
      var $currentTarget = this.$(e.currentTarget),
          getTabID = "#"+$currentTarget.attr('data-tab');

      $currentTarget.parents('ul').find('.active').removeClass('active');
      $currentTarget.parents('li').addClass('active');

      $(getTabID).parents('.tab-content').find('.active').removeClass('active');
      $(getTabID).addClass('active');
    },
    serialize: function(){
      return {
        step: this.step,
        type: this.type
      };
    }
  });


  View.AuthFields = FauxtonAPI.View.extend({
    template: "addons/replication/templates/authfields",
    initialize: function(options){
      this.type = options.type;
      this.step = options.step;
    },
    serialize: function(){
      return {
        step: this.step,
        type: this.type
      };
    }
  });

  View.ReplicationList = FauxtonAPI.View.extend({
    tagName: "ul",
    className:  "testing",
    initialize:  function(){
      Events.bind('update:tasks', this.establish, this);
      this.listenTo(this.collection, "reset", this.render);
      this.$el.prepend("<li class='header'><h4>Active Replication Tasks</h4></li>");
    },
    establish: function(){
      return [this.collection.fetch({reset: true})];
    },
    setPolling: function(){
      var that = this;
      this.cleanup();
      pollingInfo.intervalId = setInterval(function() {
        that.establish();
      }, pollingInfo.rate*1000);
    },
    cleanup: function(){
      clearInterval(pollingInfo.intervalId);
    },
    beforeRender:  function(){
      this.collection.forEach(function(item) {
        this.insertView(new View.replicationItem({ 
          model: item
        }));
      }, this);
    },
    showHeader: function(){
      if (this.collection.length > 0){
        this.$el.parent().addClass('showHeader');
      } else {
        this.$el.parent().removeClass('showHeader');
      }
    },
    afterRender: function(){
      this.showHeader();
      this.setPolling();
    }
  });

  //make this a table row item.
  View.replicationItem = FauxtonAPI.View.extend({
    tagName: "li",
    className: "row",
    template: "addons/replication/templates/progress",
    events: {
      "click .cancel": "cancelReplication"
    },
    initialize: function(){
      this.newRepModel = new replication.Replicate({});
    },
    establish: function(){
      return [this.model.fetch()];
    },
    cancelReplication: function(e){
      //need to pass "cancel": true with source & target
      var $currentTarget = this.$(e.currentTarget),
      repID = $currentTarget.attr('data-rep-id');
      this.newRepModel.save({
        "replication_id": repID,
        "cancel": true
      },
      {
        success: function(model, xhr, options){
          var notification = FauxtonAPI.addNotification({
            msg: "Replication stopped.",
            type: "success",
            clear: true
          });
        },
        error: function(model, xhr, options){
          var errorMessage = JSON.parse(xhr.responseText);
          var notification = FauxtonAPI.addNotification({
            msg: errorMessage.reason,
            type: "error",
            clear: true
          });
        }
      });
    },
    afterRender: function(){
      if (this.model.get('continuous')){
        this.$el.addClass('continuous');
      }
    },
    serialize: function(){
      return {
        progress:  this.model.get('progress'),
        target: this.model.get('target'),
        source: this.model.get('source'),
        continuous: this.model.get('continuous'),
        repid: this.model.get('replication_id')
      };
    }
  });

  return View;
});
