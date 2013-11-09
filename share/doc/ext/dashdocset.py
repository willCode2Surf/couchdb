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

# Based on Ruby script by Stephen Benner
# https://github.com/SteveBenner/couchdb-dash-docset/

from lxml import html
from sphinx.util.console import bold
import urllib2, os, sqlite3, shutil, plistlib, imp, tarfile

FILE_PATH = os.path.abspath(__file__)
DOC_DIR = os.path.dirname(os.path.dirname(FILE_PATH))
BUILD_DIR = os.path.join(DOC_DIR, 'build', 'html')
ICON_SRC = os.path.join(DOC_DIR, 'images', 'icon-32px.png')

DS_DIR = os.path.join(BUILD_DIR, 'CouchDB.docset')
DOCS = os.path.join(DS_DIR, 'Contents', 'Resources', 'Documents')
PLIST_PATH = os.path.join(DS_DIR, 'Contents', 'info.plist')
DB_PATH = os.path.join(DS_DIR, 'Contents', 'Resources', 'docSet.dsidx')

FEED_PATH = os.path.join(BUILD_DIR, 'CouchDB.xml')
DIST_PATH = os.path.join(BUILD_DIR, 'CouchDB.tgz')

PLIST = {
    'CFBundleIdentifier': 'CouchDB',
    'DocSetPlatformFamily': 'CouchDB',
    'isDashDocset': True,
    'DocSetPublisherName': 'Apache CouchDB Project',
    'dashIndexFilePath': 'index.html',
    'isJavaScriptEnabled': True,
}

def ignore(dir, contents):
    if '_sources' in dir:
        return contents
    elif 'docset' in dir:
        return contents
    else:
        return []

def build(app, exception):
    
    if exception is not None:
        return
    
    if 'HTML' not in app.builder.__class__.__name__:
        return
    
    app.info(bold('building docset...'), True)
    entries = []
    title = lambda s: s.split(' ', 1)[1]
    contents = html.parse(open(os.path.join(BUILD_DIR, 'contents.html')))
    for a in contents.findall('.//li[@class="toctree-l1"]/a'):
        entries.append(('Guide', title(a.text), a.attrib['href']))
    
    for a in contents.findall('.//li[@class="toctree-l1"][10]/ul/li/a'):
        if title(a.text) == 'API Basics': continue
        entries.append(('Category', title(a.text), a.attrib['href']))
    
    for a in contents.findall('.//li[@class="toctree-l1"][11]/ul/li/a'):
        entries.append(('Struct', title(a.text), a.attrib['href']))
    
    for a in contents.findall('.//li[@class="toctree-l1"][3]/ul/li/ul/li/a'):
        if a.text.startswith('3.1'): continue
        entries.append(('Option', title(a.text), a.attrib['href']))
    
    for a in contents.findall('.//li[@class="toctree-l1"][10]/ul/li/ul/li/a'):
        if a.text.startswith('10.1'): continue
        text = title(''.join(i for i in a.itertext()))
        entries.append(('Method', text, a.attrib['href']))
    
    os.makedirs(os.path.dirname(DOCS))
    shutil.copyfile(ICON_SRC, os.path.join(DS_DIR, 'icon.png'))
    shutil.copytree(BUILD_DIR, DOCS, ignore=ignore)
    PLIST['CFBundleName'] = 'CouchDB ' + app.config.version
    plistlib.writePlist(PLIST, PLIST_PATH)
    
    db = sqlite3.connect(DB_PATH)
    cur = db.cursor()
    cur.execute('CREATE TABLE searchIndex ('
                    'id INTEGER PRIMARY KEY, '
                    'name TEXT, '
                    'type TEXT, '
                     'path TEXT'
                ');')
    
    cur.execute('CREATE UNIQUE INDEX anchor ON searchIndex (name, type, path);')
    for e in entries:
        cur.execute('INSERT INTO searchIndex (type, name, path) VALUES (?, ?, ?)', e)
    
    db.commit()
    db.close()
    
    with tarfile.open(DIST_PATH, 'w:gz') as f:
        f.add(DS_DIR)

    shutil.rmtree(DS_DIR)
    with open(FEED_PATH, 'w') as f:
        print >> f, '<entry>'
        print >> f, '<version>%s</version>' % app.config.version
        print >> f, '<url>http://docs.couchdb.org/latest/en/CouchDB.tgz</url>'
        print >> f, '</entry>'
   
    app.info(' done')

def setup(app):
    app.connect('build-finished', build)
