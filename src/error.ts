const config = require('config');
const retry = require('retry');

/* *** ***  IMPORTS  *** *** */


export default function errorHandler(err) {
  if (!err.detail)
    return console.error('-> ERROR:\n', err);

  const operation = retry.operation({ maxtimeout: config.maxTimeout });

  operation.attempt(attempt => {
    if (operation.retry(err))
      console.error('-> ERROR:\n', err);
  });
}
