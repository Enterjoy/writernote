
const mailgun = Meteor.settings.private.mailgun;
const login = mailgun.login;
const password = mailgun.password;
const smtpdomain = mailgun.smtpdomain;

process.env.MAIL_URL = `smtp://${login}:${password}@${smtpdomain}:587/`;
