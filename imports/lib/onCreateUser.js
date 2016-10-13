import R from 'ramda';

Accounts.onCreateUser(function(options, user) {

  user.profile = {};

  if (user.services.facebook) {
    const faceProfile = user.services.facebook;

    options.profile = R.merge(options.profile, {
      firstName: faceProfile.first_name,
      lastName: faceProfile.last_name,
      avatar: `//graph.facebook.com/${faceProfile.id}/picture/?type=large`,
    });

    options.emails = [
      {
        address: faceProfile.email,
      }
    ];
  }

  if (user.services.google) {
    const ggProfile = user.services.google;

    options.profile = R.merge(options.profile, {
      firstName: ggProfile.given_name,
      lastName: ggProfile.family_name,
      avatar: ggProfile.picture,
    });

    options.emails = [
      {
        address: ggProfile.email,
      }
    ];
  }

  if (options.profile) {
    user.profile = options.profile;
  }

  if (options.emails) {
    user.emails = options.emails;
  }

  // Meteor.defer(function() {
  //   return Email.sendWelcome(user.emails[0].address);
  // });
  return user;
});
