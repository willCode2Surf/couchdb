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
       'api',
       'addons/permissions/views',
       'addons/permissions/resources',
       'testUtils'
], function (FauxtonAPI, Views, Models, testUtils) {
  var assert = testUtils.assert,
  ViewSandbox = testUtils.ViewSandbox;

  describe('PermissionsSection', function () {
    var section, security;

    beforeEach(function () {
      security = new Models.Security({'admins': {
        'names': ['_user'],
        'roles': []
      }
      }, {database: 'fakedb'});

      section = new Views.PermissionSection({
        section: 'admins'
      });

      viewSandbox = new ViewSandbox();
      viewSandbox.renderView(section); 
    });

    afterEach(function () {
      viewSandbox.remove();
    });


  });

  describe('PermissionItem', function () {
    var item;

    beforeEach(function () {
      item = new Views.PermissionItem({
        item: '_user'
      });

      viewSandbox = new ViewSandbox();
      viewSandbox.renderView(item); 
    });

    afterEach(function () {
      viewSandbox.remove();
    });

    it('should trigger event on remove item', function () {
      var eventSpy = sinon.spy();

      Views.events.on('itemRemoved', eventSpy);

      item.$('.close').click();
      
      assert.ok(eventSpy.calledOnce); 
    });

    it('should set removed to true', function () {
      item.$('.close').click();
      
      assert.ok(item.removed); 
    });
  });

});
