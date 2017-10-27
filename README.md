# Email Mapping Importer v2

## NODE 8.5.0
1- Install NVM [Node Version Manager] on your machine:
<br>`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash`
<br>2- On root folder: `$ nvm use`
<br>3- `$ npm i`

## DEV
- in one terminal tab: `$ npm run dev`
- in a second terminal tab: `$ npm run watch` _(typescript in watch mode)_<br>
The transpile code will be stored in `/build`

## USAGE
_arguments setted in npm dev script when using: `$ npm run dev`_
<br>`$ node email-mapping-importer.js --api_token=[API_TOKEN] --datamart_id=[DATAMART_ID] --directory=[DIRECTORY] --email_file=[EMAIL FILE]`
> NOTE: Don't forget to do first: `$ npm run build`

## PROD
- on init or script change: `$ npm run build`
- launch: `$ node build/index.js <+ needed arguments>`

## CONSTANTS
- Present in config/default.json

## DOC
https://developer.mediarithmics.com
<br>https://developer.mediarithmics.com/pages/audience/user_identifier.html
