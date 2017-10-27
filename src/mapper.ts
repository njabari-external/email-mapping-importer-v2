const config = require('config');

import { TCLIArguments } from './types/main';

/* *** ***  IMPORTS  *** *** */

export function mapCLIArguments(args:string[]) {
  let nodeArgv = <TCLIArguments>{};

  for (let arg of args) {
    // .slice(2) = remove the double minus '--'
    let toSplit = arg.split('=');
    let {key, value} = {key: toSplit[0].slice(2), value: toSplit[1]};

    nodeArgv[key] = value;
  }

  if (nodeArgv.workerCount == undefined)
    nodeArgv.workerCount = config.workerCount;
  else if (nodeArgv.workerCount)
    nodeArgv.workerCount = Number(nodeArgv.workerCount);

  return nodeArgv;
}


export function mapURL(args, emailHash) {
  let c = config.api;
  let URL_base = `${c.host}${c.base}`,
      URL_path = `${c.path[0]}${emailHash}${c.path[1]}${args.technical_name}`;

  return `${URL_base}${args.datamart_id}${URL_path}${c.query}`;
}
