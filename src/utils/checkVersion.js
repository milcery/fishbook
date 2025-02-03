const chalk = require('chalk');
const {version, name} = require('../../package.json');
const {get} = require('https');

function getVersion() {
  return new Promise((resolve, reject) => {
    const req = get(
      'https://registry.npmjs.org/' + name,
      res => {
        let data = '';

        // 接收数据块
        res.on('data', chunk => {
          data += chunk;
        });

        // 响应结束
        res.on('end', () => {
          try {
            resolve(JSON.parse(data)['dist-tags']['latest']);
          } catch (err) {
            reject(err);
          }
        });
      });

    req.on('error', reject);

    req.end();
  });
}

function format(version) {
  return Number(version.replace(/\./g, ''));
}

module.exports = async () => {
  const confJson = require(global.fishbook.confPath);
  const saveConf = require(global.fishbook.srcPath + '/utils/saveConf.js');

  const { checkVersion } = confJson;

  if (checkVersion === undefined) {
    return true;
  }

  const now = Date.now();
  let latest = checkVersion.latest;

  if ( now > checkVersion.lastTimestamp + 864e5 ) {
    latest = await getVersion();

    confJson.checkVersion = {
      lastTimestamp: now,     // 最后一次检查的时间戳
      latest                  // 最后一个的版本
    };
    await saveConf(global.fishbook.confPath, confJson);
  }

  if (format(latest) > format(version)) {
    console.log(`
          >=>                            >=>
          >=>                            >=>
          >=>         >=>        >=>     >=>  >=>
          >=>>==>   >=>  >=>   >=>  >=>  >=> >=>
          >=>  >=> >=>    >=> >=>    >=> >=>=>
          >=>  >=>  >=>  >=>   >=>  >=>  >=> >=>
          >=>>==>     >=>        >=>     >=>  >=>
  ${chalk.yellow('.-----------------------------------------------------------.')}
  ${chalk.yellow('|                                                           |')}
  ${chalk.yellow('|')}  New ${chalk.cyan('patch')} version of fishbook available! ${chalk.red(version)} -> ${chalk.green(latest)}  ${chalk.yellow('|')}
  ${chalk.yellow('|')}          Run ${chalk.green('npm install -g fishbook')} to update!           ${chalk.yellow('|')}
  ${chalk.yellow('|                                                           |')}
  ${chalk.yellow('\'-----------------------------------------------------------\'')}
`);

    return false;
  }

  return true;
}
