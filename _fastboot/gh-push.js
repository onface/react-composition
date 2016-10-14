var ghpages = require('gh-pages');
var path = require('path')
var fs = require('fs')
ghpages.publish(path.join(__dirname, '../output'), {
    message: 'fast-flow/boot Auto-generated commit',
    logger: function(message) {
        console.log(message);
    },
    add: true
}, function(err) {
    console.log(err)
});
console.log('git branch gh-pages pushing...')
