const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const execa = require('execa');
const packageJson = require('./package.json');

const {
  setLatestPackage,
  copyFiles,
  installPackge,
  writeJsonToApp,
  isEmptyExistDir
} = require('./utils');

function copyTemplate(appDir, appName) {
  setLatestPackage(packageJson.dependencies);
  setLatestPackage(packageJson.devDependencies);
  packageJson.name = appName;
  copyFiles(path.resolve(__dirname, '../template'), appDir);
  writeJsonToApp(appDir, 'package.json', packageJson);
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
    cwd: appDir,
    stdio: 'inherit'
  });
  copyTemplate(appDir, appName);
  console.log(`📦  Installing additional dependencies...`);
  installPackge(appDir);
  console.log(`🎉  Successfully created project ${chalk.yellow(appName)}.`);
  console.log(chalk.gray('Execute the following command to start the project'));
  console.log(`cd ${chalk.blue(appName)}.`);
  console.log(chalk.blue('yarn start'));

  process.exit(1);
}

module.exports = create;
