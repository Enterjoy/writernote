
import { User } from '../../api/User/User.js';
import { Block } from '../../api/Block/Block.js';
import { File } from '../../api/File/File.js';
import { Folder } from '../../api/Folder/Folder.js';
import { Book } from '../../api/Book/Book.js';
import { Share } from '../../api/Share/Share.js';

import { DevFixtures } from './dev';
import { ProdFixtures } from './prod';

let fixtures = DevFixtures;

switch (Meteor.settings.public.env) {
  case 'dev':
    fixtures = DevFixtures;
    break;
  case 'prod':
    fixtures = ProdFixtures;
    break;
  default:
}

const collections = {
  User,
  Block,
  File,
  Folder,
  Book,
  Share,
};

if (process.env.LOAD_FIXTURES === 'true') {
  for (const collectionName in fixtures) {
    if (fixtures.hasOwnProperty(collectionName)) {

      const collection = collections[collectionName];

      collection.remove({});

      fixtures[collectionName].forEach(doc => collection.insert(doc));
    }
  }

}
