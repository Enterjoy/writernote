import { User } from './User.js';

User.helpers({
  email() {
    return this.emails[0].address;
  },
  fullName() {
    const profile = this.profile;
    const {
      firstName,
      lastName,
    } = profile;

    return `${firstName} ${lastName}`;
  },
});
