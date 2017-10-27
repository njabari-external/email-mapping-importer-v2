import { mapCLIArguments } from './mapper';

const fs = require('fs');
const config = require('config');
const retry = require('retry');

/* *** ***  IMPORTS  *** *** */

// (.slice = remove non arguments)
const CLI_ARGS = mapCLIArguments(process.argv.slice(2));
const outputFile:string = `${CLI_ARGS.directory}${config.outputFile}`;


export default function errorHandler(err) {
  return new Promise((resolve, reject) => {
    if (!err.detail) {
      console.error('-> ERROR:\n', err);
      reject();
    }

    const operation = retry.operation(config.retry);

    operation.attempt(attempt => {
      if (operation.retry(err))
        console.error('-> ERROR:\n', err);

      if (attempt == config.retry.retries) {
        const writeStream = fs.createWriteStream(outputFile, {flags: 'r+'});
        writeStream.write(err.detail);
        reject();
      }
    });

  });
}
