const p = Meteor.settings.private;

const faceAppId = p.facebook.appId;
const faceSecret = p.facebook.secret;

const ggClientId = p.google.clientId;
const ggSecret = p.google.secret;

ServiceConfiguration.configurations.upsert({
  service: 'facebook'
}, {
  $set: {
    service: 'facebook',
    appId: faceAppId,
    secret: faceSecret,
  }
});


ServiceConfiguration.configurations.upsert({
  service: 'google'
}, {
  $set: {
    service: 'google',
    clientId: ggClientId,
    secret: ggSecret,
  }
});
