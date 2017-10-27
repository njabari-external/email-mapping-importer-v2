import { mapCLIArguments } from './mapper';
import { emailInserter } from './helpers';
import errorHandler from './error';

const fs = require('fs');
const config = require('config');
const parse = require('csv-parse');

/* *** ***  IMPORTS  *** *** */


// (.slice = remove non arguments)
const CLI_ARGS = mapCLIArguments(process.argv.slice(2));
const outputFile:string = `${CLI_ARGS.directory}${config.outputFile}`;

// Init Read & Write Streams
const readStream = fs.createReadStream(CLI_ARGS.email_file);
const writeStream = fs.createWriteStream(outputFile);

const emailParser = parse({columns: true, delimiter: ','});


function logMessage(status) {
  if (status == 'init')
    console.log('-> CALLING API ...');
  else if (status == 'called')
    console.log('-> SUCCESS: API CALL');
  else if (status == 'write')
    console.log('-> SUCCESS: WRITE FILE');
}

// Process
readStream
  .pipe(emailParser)
    .on('error', errorHandler)
    .on('finish', () => logMessage('init'))
  .pipe(emailInserter())
    .on('finish', () => logMessage('called'))
  .pipe(writeStream)
    .on('error', errorHandler)
    .on('finish', () => logMessage('write'));
