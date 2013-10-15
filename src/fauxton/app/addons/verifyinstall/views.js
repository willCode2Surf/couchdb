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
  "addons/verifyinstall/resources",
  "modules/databases/resources",
  "modules/documents/resources"
],
function(app, FauxtonAPI, VerifyInstall, Databases, Documents) {

  // x - &#x2717;
  // correct -  &#10003;

  VerifyInstall.Main = FauxtonAPI.View.extend({
    template: 'addons/verifyinstall/templates/main',

    events: {
      "click #start": "startTest"
    },

    initialize: function (options) {
      _.bindAll(this);
    },

    setPass: function (id) {
      this.$('#' + id).html('&#10003;');
    },

    setError: function (id, msg) {
      this.$('#' + id).html('&#x2717;');
      FauxtonAPI.addNotification({
        msg: 'Error: ' + msg,
        type: 'error',
        selector: '#error'
      });
    },

    complete: function () {
      FauxtonAPI.addNotification({
        msg: 'Success! You Couchdb install is working. Time to Relax',
        type: 'success',
        selector: '#error'
      });
    },

    enableButton: function () {
      this.$('#start').removeAttr('disabled').text('Verify Installation');
    },

    disableButton: function () {
      this.$('#start').attr('disabled','disabled').text('Verifying');
    },

    formatError: function (id) {
      var enableButton = this.enableButton,
          setError = this.setError;

      return function (xhr, error, reason) {
        enableButton();

        if (!xhr) { return; }

        setError(id, JSON.parse(xhr.responseText).reason);
      };
    },

    startTest: function () {
      this.disableButton();

      var doc, viewDoc, dbReplicate,
          setPass = this.setPass,
          complete = this.complete,
          setError = this.setError,
          formatError = this.formatError;

      var db = new Databases.Model({
        id: 'garren_testdb',
        name: 'garren_testdb'
      });
      
      db.destroy()
      .then(function () {
        return db.save();
      }, formatError('create-database'))
      .then(function () {
        setPass('create-database');
        doc = new Documents.Doc({_id: 'test_doc_1', a: 1}, {
          database: db
        });
        return doc.save();
      }, formatError('create-document'))
      .then(function () {
        setPass('create-document');
        doc.set({b: "hello"});
        return doc.save(); 
      }, formatError('update-document'))
      .then(function () {
        setPass('update-document');
        return doc.destroy();
      }, formatError('delete-document'))
      .then(function () {
        setPass('delete-document');
      })
      .then(function () {
        var doc1 = new Documents.Doc({_id: 'test_doc10', a: 1}, {
          database: db
        });

        var doc2 = new Documents.Doc({_id: 'test_doc_20', a: 2}, {
          database: db
        });

        var doc3 = new Documents.Doc({_id: 'test_doc_30', a: 3}, {
          database: db
        });

        viewDoc = new Documents.Doc({
          _id: '_design/view_check',
          views: {
            'testview': { 
              map:'function (doc) { emit(doc._id, doc.a); }',
              reduce: '_sum'
            }
          } 
        },{
          database: db,
        });

        return FauxtonAPI.when([doc1.save(),doc2.save(), doc3.save(), viewDoc.save()]);

      }, formatError('create-view'))
      .then(function () {
        var deferred = FauxtonAPI.Deferred();
        var promise = $.get(viewDoc.url() + '/_view/testview');

        promise.then(function (resp) { 
          var row = JSON.parse(resp).rows[0];
          if (row.value === 6) {
            return deferred.resolve();
          }
          var reason = {
              reason: 'Values expect 6, got ' + row.value
            };

          deferred.reject({responseText: JSON.stringify(reason)});
        }, deferred.reject);

        return deferred;
      }, formatError('create-view'))
      .then(function () {
        setPass('create-view');

        return $.ajax({
          url: '/_replicate',
          contentType: 'application/json',
          type: 'POST',
          dataType: 'json',
          processData: false,
          data: JSON.stringify({
            create_target: true,
            source: 'garren_testdb',
            target: 'test_replicate'
          }),

        });
      }, formatError('create-view'))
      .then(function () {
        dbReplicate = new Databases.Model({
          id: 'test_replicate',
          name: 'test_replicate'
        });

        return dbReplicate.fetch();
      }, formatError('replicate'))
      .then(function () {
        var docCount = dbReplicate.get('doc_count');
        if ( docCount === 4) {
          setPass('replicate');
          complete();
          return;
        }
        setError('replicate', 'Replication Failed, expected 4 docs got ' + docCount);
      }, formatError('replicate'));

      this.enableButton();
      //*** SET HEADERS
    }
  });


  return VerifyInstall;

});
