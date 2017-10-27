import { mapCLIArguments, mapURL } from './mapper';
import errorHandler from './error';

const parallelTransform = require('parallel-transform');
const requestPromise = require('request-promise');

/* *** ***  IMPORTS  *** *** */


const CLI_ARGS = mapCLIArguments(process.argv.slice(2));


function callAPI(emailHash) {
  const options:any = {
    uri: mapURL(CLI_ARGS, emailHash),
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : CLI_ARGS.api_token
    },
    body: JSON.stringify({
      "active": true,
      "technical_name": CLI_ARGS.technical_name
    })
  };

  return requestPromise(options);
}

let i = 0;
export function emailInserter() {
  return parallelTransform(CLI_ARGS.workerCount, {ordered:false}, (line, callback) => {
    i++
    // remove bracket from coming string, ex: [email_hash];
    let emailHash:string = line['$email_addresses.$hash'].replace(/[\[\]']+/g, '');

    if (i == 30) {
      emailHash = line['$email_addresses.$hash'];

    }

    callAPI(emailHash)
      .then(() => callback(null, `OK, UR: ${emailHash}\n`))
      .catch(err => { 
        i++
        let errorMessage = {error: err, detail: `KO, UR: ${emailHash} - ${err}`};

        errorHandler(errorMessage)
          .then(() => callback(null))
          .catch(err => callback(null));
      });
  });

}
