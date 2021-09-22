const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const execa = require('execa');
const configJson = require('./config.json');

const {
  setLatestPackage,
  copyFiles,
  installPackge,
  writeJsonToApp,
  isEmptyExistDir
} = require('./utils');

function copyTemplate(appDir, appName) {
  setLatestPackage(configJson.dependencies);
  setLatestPackage(configJson.devDependencies);
  configJson.name = appName;
  copyFiles(path.resolve(__dirname, '../template'), appDir);
  writeJsonToApp(appDir, 'package.json', configJson);
}

async function create(appName) {
  const appDir = path.resolve(process.cwd(), appName);
  const isPass = await isEmptyExistDir(appDir, appName);
  if (!isPass) {
    return;
  }
  console.log(`🚀  Invoking generators...`);
  fs.mkdirSync(appDir);
  execa.sync('git', ['init'], {
    cwd: appDir
  });
  copyTemplate(appDir, appName);
  console.log(`📦  Installing additional dependencies...`);
  installPackge(appDir);
  console.log(`🎉 Successfully created project ${chalk.green(appName)}.`);
  console.log(chalk.bold('Execute the following command to start the project'));
  console.log(chalk.cyan('cd ' + appName));
  console.log(chalk.cyan('yarn start'));

  process.exit(1);
}

module.exports = create;
