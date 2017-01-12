
import { Mongo } from 'meteor/mongo';
import { Index, MinimongoEngine } from 'meteor/easy:search'

// create collection for website urls
Websites = new Mongo.Collection("websites");

WebIndex = new Index({
  collection: Websites,
  fields: ['title','description'],
  engine: new MinimongoEngine(),
});



