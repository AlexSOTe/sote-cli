#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 用于检查入口文件是否正常执行
console.log('my-node-cli working~')
const fs = require('fs')
const inquirer = require('inquirer')
const path = require('path')
const ejs = require('ejs')


//模板文件目录
const templatesUrl = path.join(__dirname, 'templates');
console.log('模板文件目录', templatesUrl);
//生成文件的目录
let outputDir = ''
const GetOutputDir = (outputDir) => path.join(process.cwd(), outputDir);

function IsDirectory(url) {
  return fs.lstatSync(url).isDirectory()
}
function ReadAllFiles(url) {
  //从模板中读取文件
  fs.readdir(url, (err, files) => {
    if (err) {
      return
    }
    files.forEach(async file => {
      const fileSub = path.join(url, file)
      if (!IsDirectory(fileSub)) { // 不是目录
        const renderResult = await ejs.renderFile(fileSub)
        console.log(222, GetOutputDir(outputDir));
        fs.writeFileSync(GetOutputDir(outputDir), renderResult)
      } else { // 是目录
        ReadAllFiles(fileSub)
      }
    })
  })
}

inquirer.prompt([
  {
    type: 'input', //type： input, number, confirm, list, checkbox ... 
    name: 'name', // key 名
    message: '请输入项目名称', // 提示信息
    default: 'my-vue-project' // 默认值
  }
]).then(answers => {
  // 打印互用输入结果
  console.log('answers', answers)
  outputDir = answers.name || 'my-project'
  ReadAllFiles(templatesUrl)
})
