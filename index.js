#!/usr/bin/env node
const inquirer = require('inquirer');
const Git = require("nodegit");
const fs = require("fs");


console.log("欢迎使用大名鼎鼎的无名小卒 sote 的 sote-cli !!");


let projectDir = '';

/**
 * 克隆远程仓库代码
 * @param {string} url 源码仓库地址
 * @param {string} path 要下载的目标路径
 * @param {Function} cb 下载结束后的回调函数
 */
function GitClone(url, path, cb) {
  console.log("正在下载远程仓库代码...")
  console.log(url)
  Git.Clone(url, path)
    .then(function (res) {
      console.log("下载完成")
      cb(true)
    })
    .catch(function (err) {
      console.log("下载失败" + err);
      cb(false)
    });
}

/**
 * 获取指定目录下所有文件
 */
function GetAllProjectFilePath(path) {
  const fileList = [];
  const isDirectory = fs.statSync(path).isDirectory();
  if (isDirectory) {
    let dirs = fs.readdirSync(path);
    const excludeFileArr = ['.git', '.vs', '.vscode', '.idea', 'README.md'];
    dirs = dirs.filter(v => !excludeFileArr.includes(v));
    dirs.forEach(v => {
      fileList.push(...GetAllProjectFilePath(`${path}/${v}`));
    })
  } else {
    fileList.push(path);
  }
  return fileList;
}

/**
 * 获取文件字符串替换
 * @param {string[]} paths
 * @param {object} vars
 */
function ReplaceFileVars(paths, vars) {
  let _paths = paths.filter(v => !v.includes('img'));
  _paths.forEach(path => {
    let file = fs.readFileSync(path, { encoding: 'utf-8' });
    for (const key in vars) {
      console.log(key, vars[key]);
      const reg = new RegExp(`${key}`, 'i')
      file = file.replace(reg, vars[key]);
    }
    fs.writeFileSync(path, file, { encoding: 'utf-8' });
  })
}


inquirer.prompt([
  {
    type: "input",
    name: "sote_cli_project_name",
    message: "项目名称",
  },
  {
    type: "input",
    name: "sote_cli_auth_name",
    message: "作者名称",
  },
  {
    type: "input",
    name: "sote_cli_auth_email",
    message: "作者邮箱",
  },
  {
    type: "input",
    name: "sote_cli_api_url_dev",
    message: "测试环境api链接",
  },
  {
    type: "input",
    name: "sote_cli_api_url_staging",
    message: "预生产环境api链接",
  },
  {
    type: "input",
    name: "sote_cli_api_url_prod",
    message: "生产环境api链接",
  },
  {
    type: "input",
    name: "sote_cli_api_base_url",
    message: "项目部署的url（eg：xxx、xxx/xxx）",
  },
]).then((vars) => {
  console.log(vars);
  projectDir = `${__dirname}/${vars.sote_cli_project_name}`;
  // 已存在项目目录就删除
  if (fs.existsSync(projectDir)) {
    fs.rmSync(projectDir, { recursive: true });
  }
  GitClone(
    'https://github.com/AlexSOTe/sote-quick-start.git',
    projectDir,
    (isDone) => {
      if (isDone) {
        // 获取项目目录下所有文件
        const paths = GetAllProjectFilePath(projectDir);
        ReplaceFileVars(paths, vars);
      }
    }
  )
});
// UNDONE 需要删除clone下来的项目的 .git 文件夹
// UNDONE 源项目一些ts build的时候报的错需要处理变量需要处理
