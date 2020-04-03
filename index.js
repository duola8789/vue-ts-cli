#! /usr/bin/env node

const fs = require('fs');
const program = require('commander');
const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');

const success = chalk.blueBright;
const error = chalk.bold.red;

// 拉取模板的地址
const templateUrl = 'direct:https://github.com/duola8789/vue-ts-template.git';

const changePackage = () => {
  fs.readFile(`${process.cwd()}/${program.init}/package.json`, (err, data) => {
    if (err) throw err;
    let _data = JSON.parse(data.toString());
    _data.name = program.init;
    _data.version = '1.0.0';
    let str = JSON.stringify(_data, null, 4);
    fs.writeFile(`${process.cwd()}/${program.init}/package.json`, str, function (err) {
      if (err) throw err;
    })
  });
};

program.version('0.1.0')
  .option('-i, init [name]', '初始化 Vue + TypeScript 项目')
  .parse(process.argv);

if (program.init && typeof program.init === "string") {
  const spinner = ora('正在拉取 vue-ts-template 模板...').start();
  download(templateUrl, program.init, { clone: true }, function (err) {
    if (!err) {
      spinner.succeed(success('拉取成功'));
      // 更改 package.json 中的 name 和版本号
      changePackage()
    } else {
      spinner.fail('拉取失败：');
    }
  });
} else {
  console.error(error('请在init后输入目录名'));
}
