const fs = require('fs-extra');
const path = require('path');
const execa = require('execa');
const chalk = require('chalk');
const inquirer = require('inquirer');

const excludePackage = ['chalk'];

const setLatestPackage = (deps) => {
  Object.keys(deps).forEach((key) => {
    if (excludePackage.includes(key)) return;
    deps[key] = '^' + execa.sync('npm', ['view', key, 'version']).stdout;
  });
};
const copyFiles = (dirPath, appRoot) => {
  fs.removeSync(dirPath + '/node_modules');
  fs.copySync(dirPath, appRoot, {
    filter: (file) => path.basename(file) !== 'package.json'
  });
};
const writeJsonToApp = (root, fileName, content) => {
  fs.writeFileSync(path.join(root, fileName), JSON.stringify(content, null, 2));
};
const installPackge = (root) => {
  execa.sync('yarn', {
    cwd: root,
    stdio: 'inherit'
  });
};
const isEmptyExistDir = async (appDir, appName) => {
  if (fs.existsSync(appDir)) {
    const { override } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'override',
        message: chalk.red(`directory ${appName} exist,override it?`)
      }
    ]);
    if (override) {
      console.log(chalk.green('removing...'));
      fs.removeSync(appDir);
      return true;
    } else {
      process.exit(1);
    }
  }
  return true;
};
module.exports = {
  setLatestPackage,
  copyFiles,
  installPackge,
  writeJsonToApp,
  isEmptyExistDir
};
