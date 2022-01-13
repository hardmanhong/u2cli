const fs = require('fs-extra');
const path = require('path');
const execa = require('execa');
const chalk = require('chalk');
const inquirer = require('inquirer');

const packageLastest = [
  'u2antd',
  'u2hooks',
  'antd',
  'axios',
  '@ant-design/icons',
  '@ahooksjs/use-request'
];

const setLatestPackage = (deps) => {
  Object.keys(deps).forEach((key) => {
    if (packageLastest.includes(key)) {
      deps[key] = '^' + execa.sync('npm', ['view', key, 'version']).stdout;
    }
  });
};
const copyFiles = (dirPath, appRoot) => {
  const excludeFiles = ['node_modules', 'yarn.lock', 'package.json'];
  fs.copySync(dirPath, appRoot, {
    filter: (filename) => {
      return excludeFiles.every((exclude) => !filename.includes(exclude));
    }
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
