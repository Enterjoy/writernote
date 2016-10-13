# writernote
production server : http://writernote.com 

## Development
Run following scripts in order to run the app with development settings: 
(but some setting is needed : /config/settings.json )

```
npm install
npm start
```

Run following scripts in order to run the app with production settings:

```
npm install
npm run prod
```

## Deployment
Run following scripts in order to deploy with production settings:

```
npm install
DEPLOY_HOSTNAME=us-east-1.galaxy-deploy.meteor.com meteor deploy writernote.com --settings config/prod/settings.json
```

Note: there is not settings for production yet (FB app, GG app, database, etc...), so deployment will not success
