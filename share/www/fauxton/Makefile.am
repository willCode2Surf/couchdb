## Licensed under the Apache License, Version 2.0 (the "License"); you may not
## use this file except in compliance with the License. You may obtain a copy of
## the License at
##
##   http://www.apache.org/licenses/LICENSE-2.0
##
## Unless required by applicable law or agreed to in writing, software
## distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
## WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
## License for the specific language governing permissions and limitations under
## the License.

MAKE_SAFE = $(MAKE)

fauxton_src_files = \
    src/app/addons/activetasks/assets/less/activetasks.less \
    src/app/addons/activetasks/base.js \
    src/app/addons/activetasks/resources.js \
    src/app/addons/activetasks/routes.js \
    src/app/addons/activetasks/templates/detail.html \
    src/app/addons/activetasks/templates/table.html \
    src/app/addons/activetasks/templates/tabledetail.html \
    src/app/addons/activetasks/templates/tabs.html \
    src/app/addons/activetasks/tests/viewsSpec.js \
    src/app/addons/activetasks/views.js \
    src/app/addons/auth/assets/less/auth.less \
    src/app/addons/auth/base.js \
    src/app/addons/auth/resources.js \
    src/app/addons/auth/routes.js \
    src/app/addons/auth/templates/change_password.html \
    src/app/addons/auth/templates/create_admin.html \
    src/app/addons/auth/templates/login.html \
    src/app/addons/auth/templates/nav_dropdown.html \
    src/app/addons/auth/templates/nav_link_title.html \
    src/app/addons/auth/templates/noAccess.html \
    src/app/addons/config/base.js \
    src/app/addons/config/resources.js \
    src/app/addons/config/routes.js \
    src/app/addons/config/templates/dashboard.html \
    src/app/addons/config/templates/item.html \
    src/app/addons/contribute/base.js \
    src/app/addons/exampleAuth/base.js \
    src/app/addons/exampleAuth/templates/noAccess.html \
    src/app/addons/logs/base.js \
    src/app/addons/logs/resources.js \
    src/app/addons/logs/routes.js \
    src/app/addons/logs/templates/dashboard.html \
    src/app/addons/logs/templates/filterItem.html \
    src/app/addons/logs/templates/sidebar.html \
    src/app/addons/logs/tests/logSpec.js \
    src/app/addons/permissions/assets/less/permissions.less \
    src/app/addons/permissions/base.js \
    src/app/addons/permissions/resources.js \
    src/app/addons/permissions/routes.js \
    src/app/addons/permissions/templates/item.html \
    src/app/addons/permissions/templates/permissions.html \
    src/app/addons/permissions/templates/section.html \
    src/app/addons/permissions/tests/resourceSpec.js \
    src/app/addons/permissions/tests/viewsSpec.js \
    src/app/addons/permissions/views.js \
    src/app/addons/plugins/base.js \
    src/app/addons/plugins/resources.js \
    src/app/addons/plugins/routes.js \
    src/app/addons/plugins/templates/plugins.html \
    src/app/addons/replication/assets/less/replication.less \
    src/app/addons/replication/base.js \
    src/app/addons/replication/resources.js \
    src/app/addons/replication/route.js \
    src/app/addons/replication/templates/form.html \
    src/app/addons/replication/templates/progress.html \
    src/app/addons/replication/tests/replicationSpec.js \
    src/app/addons/replication/views.js \
    src/app/addons/stats/assets/less/stats.less \
    src/app/addons/stats/base.js \
    src/app/addons/stats/resources.js \
    src/app/addons/stats/routes.js \
    src/app/addons/stats/templates/by_method.html \
    src/app/addons/stats/templates/pie_table.html \
    src/app/addons/stats/templates/stats.html \
    src/app/addons/stats/templates/statselect.html \
    src/app/addons/stats/views.js \
    src/app/api.js \
    src/app/app.js \
    src/app/config.js \
    src/app/helpers.js \
    src/app/initialize.js \
    src/app/load_addons.js.underscore \
    src/app/main.js \
    src/app/mixins.js \
    src/app/modules/databases/base.js \
    src/app/modules/databases/resources.js \
    src/app/modules/databases/routes.js \
    src/app/modules/databases/views.js \
    src/app/modules/documents/base.js \
    src/app/modules/documents/resources.js \
    src/app/modules/documents/routes.js \
    src/app/modules/documents/tests/resourcesSpec.js \
    src/app/modules/documents/views.js \
    src/app/modules/fauxton/base.js \
    src/app/modules/fauxton/components.js \
    src/app/modules/fauxton/layout.js \
    src/app/modules/pouchdb/base.js \
    src/app/modules/pouchdb/pouch.collate.js \
    src/app/modules/pouchdb/pouchdb.mapreduce.js \
    src/app/resizeColumns.js \
    src/app/router.js \
    src/app/templates/databases/item.html \
    src/app/templates/databases/list.html \
    src/app/templates/databases/newdatabase.html \
    src/app/templates/databases/sidebar.html \
    src/app/templates/documents/all_docs_item.html \
    src/app/templates/documents/all_docs_list.html \
    src/app/templates/documents/changes.html \
    src/app/templates/documents/ddoc_info.html \
    src/app/templates/documents/doc.html \
    src/app/templates/documents/doc_field_editor.html \
    src/app/templates/documents/doc_field_editor_tabs.html \
    src/app/templates/documents/duplicate_doc_modal.html \
    src/app/templates/documents/edit_tools.html \
    src/app/templates/documents/index_menu_item.html \
    src/app/templates/documents/index_row_docular.html \
    src/app/templates/documents/index_row_tabular.html \
    src/app/templates/documents/jumpdoc.html \
    src/app/templates/documents/search.html \
    src/app/templates/documents/sidebar.html \
    src/app/templates/documents/tabs.html \
    src/app/templates/documents/upload_modal.html \
    src/app/templates/documents/view_editor.html \
    src/app/templates/fauxton/api_bar.html \
    src/app/templates/fauxton/breadcrumbs.html \
    src/app/templates/fauxton/footer.html \
    src/app/templates/fauxton/index_pagination.html \
    src/app/templates/fauxton/nav_bar.html \
    src/app/templates/fauxton/notification.html \
    src/app/templates/fauxton/pagination.html \
    src/app/templates/layouts/one_pane.html \
    src/app/templates/layouts/two_pane.html \
    src/app/templates/layouts/with_right_sidebar.html \
    src/app/templates/layouts/with_sidebar.html \
    src/app/templates/layouts/with_tabs.html \
    src/app/templates/layouts/with_tabs_sidebar.html \
    src/assets/css/nv.d3.css \
    src/assets/img/couchdb-site.png \
    src/assets/img/couchdblogo.png \
    src/assets/img/fontawesome-webfont.eot \
    src/assets/img/fontawesome-webfont.svg \
    src/assets/img/fontawesome-webfont.ttf \
    src/assets/img/fontawesome-webfont.woff \
    src/assets/img/FontAwesome.otf \
    src/assets/img/fontcustom_fauxton.eot \
    src/assets/img/fontcustom_fauxton.svg \
    src/assets/img/fontcustom_fauxton.ttf \
    src/assets/img/fontcustom_fauxton.woff \
    src/assets/img/glyphicons-halflings-white.png \
    src/assets/img/glyphicons-halflings.png \
    src/assets/img/linen.png \
    src/assets/img/loader.gif \
    src/assets/img/minilogo.png \
    src/assets/index.underscore \
    src/assets/js/libs/ace/ace.js \
    src/assets/js/libs/ace/ext-static_highlight.js \
    src/assets/js/libs/ace/ext-chromevox.js \
    src/assets/js/libs/ace/ext-statusbar.js \
    src/assets/js/libs/ace/ext-elastic_tabstops_lite.js \
    src/assets/js/libs/ace/ext-textarea.js \
    src/assets/js/libs/ace/ext-emmet.js \
    src/assets/js/libs/ace/ext-themelist.js \
    src/assets/js/libs/ace/ext-keybinding_menu.js \
    src/assets/js/libs/ace/ext-whitespace.js \
    src/assets/js/libs/ace/ext-language_tools.js \
    src/assets/js/libs/ace/mode-javascript.js \
    src/assets/js/libs/ace/ext-modelist.js \
    src/assets/js/libs/ace/mode-json.js \
    src/assets/js/libs/ace/ext-old_ie.js \
    src/assets/js/libs/ace/mode-jsoniq.js \
    src/assets/js/libs/ace/ext-options.js \
    src/assets/js/libs/ace/ext-searchbox.js \
    src/assets/js/libs/ace/theme-crimson_editor.js \
    src/assets/js/libs/ace/ext-settings_menu.js \
    src/assets/js/libs/ace/worker-javascript.js \
    src/assets/js/libs/ace/ext-spellcheck.js \
    src/assets/js/libs/ace/worker-json.js \
    src/assets/js/libs/ace/ext-split.js \
    src/assets/js/libs/ace/snippets/javascript.js \
    src/assets/js/libs/ace/snippets/json.js \
    src/assets/js/libs/ace/snippets/jsoniq.js \
    src/assets/js/libs/almond.js \
    src/assets/js/libs/backbone.js \
    src/assets/js/libs/bootstrap.js \
    src/assets/js/libs/d3.js \
    src/assets/js/libs/jquery.js \
    src/assets/js/libs/lodash.js \
    src/assets/js/libs/nv.d3.js \
    src/assets/js/libs/require.js \
    src/assets/js/libs/spin.min.js \
    src/assets/js/plugins/backbone.layoutmanager.js \
    src/assets/js/plugins/jquery.form.js \
    src/assets/js/plugins/prettify.js \
    src/assets/less/bootstrap/accordion.less \
    src/assets/less/bootstrap/alerts.less \
    src/assets/less/bootstrap/bootstrap.less \
    src/assets/less/bootstrap/breadcrumbs.less \
    src/assets/less/bootstrap/button-groups.less \
    src/assets/less/bootstrap/buttons.less \
    src/assets/less/bootstrap/carousel.less \
    src/assets/less/bootstrap/close.less \
    src/assets/less/bootstrap/code.less \
    src/assets/less/bootstrap/component-animations.less \
    src/assets/less/bootstrap/dropdowns.less \
    src/assets/less/bootstrap/font-awesome/bootstrap.less \
    src/assets/less/bootstrap/font-awesome/core.less \
    src/assets/less/bootstrap/font-awesome/extras.less \
    src/assets/less/bootstrap/font-awesome/font-awesome-ie7.less \
    src/assets/less/bootstrap/font-awesome/font-awesome.less \
    src/assets/less/bootstrap/font-awesome/icons.less \
    src/assets/less/bootstrap/font-awesome/mixins.less \
    src/assets/less/bootstrap/font-awesome/path.less \
    src/assets/less/bootstrap/font-awesome/variables.less \
    src/assets/less/bootstrap/forms.less \
    src/assets/less/bootstrap/grid.less \
    src/assets/less/bootstrap/hero-unit.less \
    src/assets/less/bootstrap/labels-badges.less \
    src/assets/less/bootstrap/layouts.less \
    src/assets/less/bootstrap/media.less \
    src/assets/less/bootstrap/mixins.less \
    src/assets/less/bootstrap/modals.less \
    src/assets/less/bootstrap/navbar.less \
    src/assets/less/bootstrap/navs.less \
    src/assets/less/bootstrap/pager.less \
    src/assets/less/bootstrap/pagination.less \
    src/assets/less/bootstrap/popovers.less \
    src/assets/less/bootstrap/progress-bars.less \
    src/assets/less/bootstrap/reset.less \
    src/assets/less/bootstrap/responsive-1200px-min.less \
    src/assets/less/bootstrap/responsive-767px-max.less \
    src/assets/less/bootstrap/responsive-768px-979px.less \
    src/assets/less/bootstrap/responsive-navbar.less \
    src/assets/less/bootstrap/responsive-utilities.less \
    src/assets/less/bootstrap/responsive.less \
    src/assets/less/bootstrap/scaffolding.less \
    src/assets/less/bootstrap/sprites.less \
    src/assets/less/bootstrap/tables.less \
    src/assets/less/bootstrap/tests/buttons.html \
    src/assets/less/bootstrap/tests/css-tests.css \
    src/assets/less/bootstrap/thumbnails.less \
    src/assets/less/bootstrap/tooltip.less \
    src/assets/less/bootstrap/type.less \
    src/assets/less/bootstrap/utilities.less \
    src/assets/less/bootstrap/variables.less \
    src/assets/less/bootstrap/wells.less \
    src/assets/less/config.less \
    src/assets/less/couchdb.less \
    src/assets/less/database.less \
    src/assets/less/fauxton.less \
    src/assets/less/icons.less \
    src/assets/less/logs.less \
    src/assets/less/prettyprint.less \
    src/assets/less/variables.less \
    src/bin/grunt \
    src/couchapp.js \
    src/favicon.ico \
    src/Gruntfile.js \
    src/index.html \
    src/package.json \
    src/settings.json.default \
    src/settings.json.sample_external \
    src/tasks/addon/rename.json \
    src/tasks/addon/root/base.js.underscore \
    src/tasks/addon/root/resources.js.underscore \
    src/tasks/addon/root/routes.js.underscore \
    src/tasks/addon/template.js \
    src/tasks/couchserver.js \
    src/tasks/fauxton.js \
    src/tasks/helper.js \
    src/test/core/layoutSpec.js \
    src/test/core/navbarSpec.js \
    src/test/core/paginateSpec.js \
    src/test/core/routeObjectSpec.js \
    src/test/mocha/chai.js \
    src/test/mocha/mocha.css \
    src/test/mocha/mocha.js \
    src/test/mocha/sinon-chai.js \
    src/test/mocha/sinon.js \
    src/test/mocha/testUtils.js \
    src/test/runner.html \
    src/test/test.config.underscore \
    src/writing_addons.md

fauxton_build_files = \
    build/css/index.css \
    build/img/couchdb-site.png \
    build/img/couchdblogo.png \
    build/img/fontawesome-webfont.eot \
    build/img/fontawesome-webfont.svg \
    build/img/fontawesome-webfont.ttf \
    build/img/fontawesome-webfont.woff \
    build/img/FontAwesome.otf \
    build/img/fontcustom_fauxton.eot \
    build/img/fontcustom_fauxton.svg \
    build/img/fontcustom_fauxton.ttf \
    build/img/fontcustom_fauxton.woff \
    build/img/glyphicons-halflings-white.png \
    build/img/glyphicons-halflings.png \
    build/img/img \
    build/img/linen.png \
    build/img/loader.gif \
    build/img/minilogo.png \
    build/index.html \
    build/js/ace/mode-javascript.js \
    build/js/ace/mode-json.js \
    build/js/ace/theme-crimson_editor.js \
    build/js/ace/worker-javascript.js \
    build/js/ace/worker-json.js \
    build/js/require.js

EXTRA_DIST = \
    $(fauxton_src_files) \
    $(fauxton_build_files)

BUILT_SOURCES = $(fauxton_build_files)

$(fauxton_build_files): fauxton.stamp
	@if test -f $@; then :; else \
	    rm -f fauxton.stamp; \
	    $(MAKE_SAFE) $(AM_MAKEFLAGS) fauxton.stamp; \
	fi

# @@ how is vpath handled?

# @@ fauxton_src_files includes files that are updated when grunt runs, so
# @@ this command runs each time. need to seperate this variable out

fauxton.stamp: $(fauxton_src_files)
	trap "rm -rf fauxton.lock fauxton.stamp" 1 2 13 15; \
	if mkdir fauxton.lock 2>/dev/null; then \
	    rm -f fauxton.tmp; \
	    touch fauxton.tmp; \
	    $(srcdir)/src/bin/grunt --gruntfile $(srcdir)/src/Gruntfile.js couchdb; \
	    mv -f fauxton.tmp $@; \
	    rmdir fauxton.lock; \
	else \
	    while test -d fauxton.lock; do \
	        sleep 1; \
	    done; \
	    test -f fauxton.stamp; \
	fi

install-data-local:
    for build_file in $(fauxton_build_files); do \
        if test -s $$build_file; then \
            inst_file=`echo $$build_file | sed s,^build,fauxton,`; \
            $(INSTALL) -d `dirname $(DESTDIR)$(localdatadir)/www/$$inst_file`; \
            $(INSTALL_DATA) \
                $$dist_file $(DESTDIR)$(localdatadir)/www/$$inst_file; \
        fi \
    done

uninstall-local:
	for build_file in $(fauxton_build_files); do \
	    if test -s $$build_file; then \
	        inst_file=`echo $$build_file | sed s,^build,fauxton,`; \
	        rm -f $(DESTDIR)$(localdatadir)/www/$$inst_file; \
	    fi \
	done

DISTCLEANFILES = html.stamp

distclean-local:
	rm -fr build
