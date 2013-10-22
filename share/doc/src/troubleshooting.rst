.. Licensed under the Apache License, Version 2.0 (the "License"); you may not
.. use this file except in compliance with the License. You may obtain a copy of
.. the License at
..
..   http://www.apache.org/licenses/LICENSE-2.0
..
.. Unless required by applicable law or agreed to in writing, software
.. distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
.. WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
.. License for the specific language governing permissions and limitations under
.. the License.


.. Having single file for all type of issues should motivate us to keep their
.. amount as small as possible. At least we should try to (:

.. _troubleshooting:

===============
Troubleshooting
===============

All known issues could be divided into three groups:

- When CouchDB won't build or be installed
- When CouchDB installed, but won't start
- When CouchDB returns some error during runtime


CouchDB Won't Build
===================

Make sure that you have follow the :ref:`installation guide <install>` for your
operation system.


CouchDB Won't Start
===================

First of all, make sure that CouchDB's service user (``couchdb`` by default)
has read and write permissions to the next directories and their files:

#. :file:`(install_root)/etc/couchdb/`
#. :file:`(install_root)/var/lib/couchdb/`
#. :file:`(install_root)/var/log/couchdb/`
#. :file:`(install_root)/var/run/couchdb/`

See :ref:`install/unix/security` for more information about required
permissions.

The second good tip that is in case of some problem to run CouchDB in shell
under ``couchdb`` user. This makes sure that you'll get the same behaviour as
service init script and you'll not break permissions because of running commands
as ``root`` user. Some distributions sets :file:`/sbin/nologin` shell for
``couchdb`` user -- you have to change it to :file:`/bin/bash` or similar
while fixing things (don't forget to change it back when you've done!)


CouchDB Won't Work
==================

These issues might occurs when you working with CouchDB and encounters some
unexpectable or unwanted behavior from CouchDB side. While fixing of this issue
may takes for some time (or it may be even not fixed by some reasons) there
you may found solutions to workaround them.


Re-inserting a document silently fails during compaction
--------------------------------------------------------

:issue:`1415`

There is a potential interaction between compaction and the repeated deletion
and creation of an identical document. During compaction, if you delete
a document the next creation of that document will silently fail.
It is suggested that you add a field that changes with each creation(salt).

For example, include a new UUID or a random number::

  {
      "_id": "Mt_St_Helens",
      "Erupting": False,
      "uuid":  "cb3d21a8-3278-11e3-b0c0-3c07540286af"
  }



There Is No My Issue Solution
=============================

Feel free to `open an issue`_ or mail to `mailing list`_ (`subscription`_ is
required) with your issue description. *Hope that we could help with it*!

.. _open an issue: https://issues.apache.org/jira/secure/CreateIssue!default.jspa
.. _mailing list: mailto:user@couchdb.apache.org
.. _subscription: mailto:user-subscribe@couchdb.apache.org
