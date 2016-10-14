var fs = require('fs')
var path = require('path')
var exec = require('child_process').exec
var rm = require('rm-r')
var project = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')))
var shellPath = path.join(__dirname, 'gh.sh')

require('./rm')()

exec('sh ' + shellPath + ' ' + project.version, function(error, stdout, stderr) {
    console.log('stdout: ' + stdout)
    console.log('stderr: ' + stderr)
    if (error !== null) {
        console.log('exec error: ' + error)
    }
})
