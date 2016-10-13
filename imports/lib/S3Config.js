import { Slingshot as SS } from 'meteor/edgee:slingshot';
import { Mongo } from 'meteor/mongo';

const aws = Meteor.settings.private.aws;

SS.createDirective('imageUpload', SS.S3Storage, {
  bucket: aws.bucket,
  region: aws.region,
  AWSAccessKeyId: aws.key,
  AWSSecretAccessKey: aws.secret,
  acl: 'public-read',
  maxSize: 20 * 1024 * 1024,
  // allowedFileTypes: ['application/pdf'],
  allowedFileTypes: null,
  authorize: function() {
    return !!Meteor.user();
  },
  key: function() {
    return `images/${new Mongo.ObjectID().valueOf()}`;
  }
});
