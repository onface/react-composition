var StaticServer = require('static-server');
var hashPort = require('hash-to-port')
var fs = require('fs')
var path = require('path')
var project = JSON.parse(fs.readFileSync(path.join(__dirname, '/../package.json')))
var server = new StaticServer({
  rootPath: './output',            // required, the root of the server file tree
  port: hashPort(project.name),               // optional, defaults to a random port
  cors: '*',                 // optional, defaults to undefined
  followSymlink: true,      // optional, defaults to a 404 error
  templates: {
    index: 'index.html',      // optional, defaults to 'index.html'
    notFound: '404.html'    // optional, defaults to undefined
  }
});

server.start(function () {
  console.log('Server listening to')
  console.log('http://127.0.0.1:' + server.port)
})
