import { mapCLIArguments, mapURL } from './mapper';

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


export function emailInserter() {
  return parallelTransform(CLI_ARGS.workerCount, {ordered:false}, (line, callback) => {
    // remove bracket from coming string, ex: [email_hash];
    let emailHash:string = line['$email_addresses.$hash'].replace(/[\[\]']+/g, '');

    callAPI(emailHash)
      .then(() => callback(null, `OK, UR: ${emailHash}\n`))
      .catch(err => { 
        let errorMessage = {error: err, detail: `KO, UR: ${emailHash} - ${err}\n`};
        callback(errorMessage);
      });
  });

}
