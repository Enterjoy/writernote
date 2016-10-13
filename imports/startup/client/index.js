/* global navigator */

import r from 'ramda';

import './routes.jsx';

import '../../api/User/User.js';
import '../../api/User/UserHelpers.js';

import { Block } from '../../api/Block/Block.js';
import '../../api/Block/BlockHelpers.js';

import '../../api/Share/Share.js';
import '../../api/Share/ShareHelpers.js';

import { Book } from '../../api/Book/Book.js';
import '../../api/Book/BookHelpers.js';

import { Folder } from '../../api/Folder/Folder.js';
import '../../api/Folder/FolderHelpers.js';

import { File } from '../../api/File/File.js';
import '../../api/File/FileHelpers.js';

import { Label } from '../../api/Label/Label.js';
import '../../api/Label/LabelHelpers.js';

import { Stat } from '../../api/Stat/Stat.js';
import '../../api/Stat/StatHelpers.js';

if (Meteor.isDevelopment) {
  Fo = Folder;
  Fi = File;
  R = r;
  La = Label;

  B = Book;
  Bl = Block;

  St = Stat;
}


Meteor.startup(() => {
  navigator.serviceWorker &&
  navigator.serviceWorker.register('/sw.js').then().catch(error => console.error(error));
});
