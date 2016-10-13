import { fixtures } from './fixtures.js';

fixtures.User = [
  {
    _id: 'admin',
    profile: {
      firstName: 'admin firstname',
      lastName: 'admin lastname',
      avatar: 'http://www.betapleatedchic.com/uploads/3/0/4/1/30413754/4907429_orig.gif',
    },
    services: {
      password: {
        bcrypt: '$2a$10$zEL0uOLvkGNYSNitNxNvLeHO2VFzbwbQmw7CPjzZC99bgfqbzalMu'
      },
    },
    emails: [{
      address: 'admin@gmail.com',
      verified: true,
    }],
    roles: ['admin'],
    status: {},
    createdAt: new Date('06/01/2016'),
    modifiedAt: new Date('06/01/2016'),
  }, {
    _id: 'user1',
    profile: {
      firstName: 'user1 firstname',
      lastName: 'user1 lastname',
      avatar: 'http://www.betapleatedchic.com/uploads/3/0/4/1/30413754/4907429_orig.gif',
    },
    services: {
      password: {
        bcrypt: '$2a$10$zEL0uOLvkGNYSNitNxNvLeHO2VFzbwbQmw7CPjzZC99bgfqbzalMu'
      },
    },
    emails: [{
      address: 'user1@gmail.com',
      verified: true,
    }],
    roles: ['agent_builder'],
    status: {},
    createdAt: new Date('05/26/2016'),
    modifiedAt: new Date('05/26/2016'),
  }, {
    _id: 'user2',
    profile: {
      firstName: 'user2 firstname',
      lastName: 'user2 lastname',
      avatar: 'http://www.betapleatedchic.com/uploads/3/0/4/1/30413754/4907429_orig.gif',
    },
    services: {
      password: {
        bcrypt: '$2a$10$zEL0uOLvkGNYSNitNxNvLeHO2VFzbwbQmw7CPjzZC99bgfqbzalMu'
      },
    },
    emails: [{
      address: 'user2@gmail.com',
      verified: true,
    }],
    roles: ['agent_builder'],
    status: {},
    createdAt: new Date('05/26/2016'),
    modifiedAt: new Date('05/26/2016'),
  }, {
    _id: 'user3',
    profile: {
      firstName: 'user3 firstname',
      lastName: 'user3 lastname',
      avatar: 'http://www.betapleatedchic.com/uploads/3/0/4/1/30413754/4907429_orig.gif',
    },
    services: {
      password: {
        bcrypt: '$2a$10$zEL0uOLvkGNYSNitNxNvLeHO2VFzbwbQmw7CPjzZC99bgfqbzalMu'
      },
    },
    emails: [{
      address: 'user3@gmail.com',
      verified: true,
    }],
    roles: [],
    status: {},
    createdAt: new Date('05/26/2016'),
    modifiedAt: new Date('05/26/2016'),
  }, {
    _id: 'user4',
    profile: {
      firstName: 'user4 firstname',
      lastName: 'user4 lastname',
      avatar: 'http://www.betapleatedchic.com/uploads/3/0/4/1/30413754/4907429_orig.gif',
    },
    services: {
      password: {
        bcrypt: '$2a$10$zEL0uOLvkGNYSNitNxNvLeHO2VFzbwbQmw7CPjzZC99bgfqbzalMu'
      },
    },
    emails: [{
      address: 'user4@gmail.com',
      verified: true,
    }],
    roles: [],
    status: {},
    createdAt: new Date('05/26/2016'),
    modifiedAt: new Date('05/26/2016'),
  }, {
    _id: 'user5',
    profile: {
      firstName: 'user5 firstname',
      lastName: 'user5 lastname',
      avatar: 'http://www.betapleatedchic.com/uploads/3/0/4/1/30413754/4907429_orig.gif',
    },
    services: {
      password: {
        bcrypt: '$2a$10$zEL0uOLvkGNYSNitNxNvLeHO2VFzbwbQmw7CPjzZC99bgfqbzalMu'
      },
    },
    emails: [{
      address: 'user5@gmail.com',
      verified: true,
    }],
    roles: [],
    status: {},
    createdAt: new Date('05/26/2016'),
    modifiedAt: new Date('05/26/2016'),
  }
];
