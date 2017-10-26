
export function mapCLIArguments(argv:string[]) {
  let nodeArgv:any = {};

  for (let arg of argv) {
    let toSplit = arg.split('=');
    // .slice(2) = remove the double minus '--'
    let {key, value} = {key: toSplit[0].slice(2), value: toSplit[1]};

    nodeArgv[key] = value;
  }

  return nodeArgv;
}
