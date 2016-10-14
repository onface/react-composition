var ejs = require('ejs')
var fs = require('fs')
var path = require('path')
var eachFile = require("each-file")
var packageContent = require('fs').readFileSync(path.join(__dirname, '../package.json')).toString()
var oPackage = JSON.parse(packageContent)

var initFile = [
    '**.md',
    'example/**/**.md',
    'doc/**/**.md',
    'test/**/**.md'
]

initFile.forEach(function (filepath) {
    eachFile(filepath, function withFile(file, cb) {
        var content = file.contents.toString()
        var renderResult = ejs.render(content, oPackage)
        var absolutePath = path.join(__dirname, '../', file.path)
        fs.writeFileSync(absolutePath, renderResult, 'utf-8')
        console.log('## writeFile: ' + absolutePath)
        cb(null);
    }, function onDone() {
        console.log('# ' + filepath + ' init done\n')
    })
})
var gitignorePath = path.join(__dirname, '../', '.gitignore')
var gitignoreContent = [
    '\n# fast-boot ignore file',
    'node_modules',
    '.DS_Store',
    'npm-debug.log',
    'output'
].join('\n')
var exist = fs.existsSync(gitignorePath)
if (exist) {
    gitignoreContent = fs.readFileSync(gitignorePath).toString() + gitignoreContent
}
fs.writeFileSync(gitignorePath, gitignoreContent, 'utf-8')
