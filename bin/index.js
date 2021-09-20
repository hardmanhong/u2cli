#!/usr/bin/env node
const { program } = require('commander');
const readline = require('readline');
const chalk = require('chalk');
const path = require('path');
const clearConsole = (title) => {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows);
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    if (title) {
      console.log(title);
    }
  }
};
program
  .version(require('../package').version)
  .name('u2cli')
  .usage(`${chalk.yellow('create')} <app-name>`);

program
  .command('create <app-name>')
  .description('create a new project')
  .action((name) => {
    const create = require('./create');
    clearConsole(chalk.yellow(`u2cli v${require('../package').version}`));
    create(name);
  });

program.arguments('<command>').action((cmd) => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
});

program.parse(process.argv);

if (!program.args.length) {
  program.outputHelp();
}
