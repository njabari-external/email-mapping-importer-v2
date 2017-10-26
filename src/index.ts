import { mapCLIArguments } from './mapper';

/* *** ***  IMPORTS  *** *** */

// Map the Script arguments (.slice = remove paths)
const NODE_ARGV = mapCLIArguments(process.argv.slice(2));

console.log('>> Arguments', NODE_ARGV);
