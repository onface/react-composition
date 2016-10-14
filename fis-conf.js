var fs = require('fs')
var path = require('path')
var project = JSON.parse(fs.readFileSync(__dirname + '/package.json'))
fis.hook('relative');

// 让所有文件，都使用相对路径。
fis.match('**', {
  relative: true
})

// js
var babel = require('babel-core');
fis.match('*.js', {
    parser: [
        function (content, file) {
            return babel.transform(content, {
                presets: [
                     "es2015",
                     "react"
                ]
            }).code
        },
        fis.plugin("translate-es3ify")
    ]
})
// doc/vendor/ 下的文件不做 es6 编译
fis.match('doc/vendor/**.js', {
    parser: []
})

var webpackResolveAlias = {}
webpackResolveAlias[project.name] = path.join(__dirname)
fis.match('*.md:js', {
    parser: fis.plugin('webpack', {
        externals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
            // 'moment': 'moment',
            // 'moment/min/moment.min': 'moment',
        },
        module: {
            postLoaders: [
                // 如果不需要兼容IE8请去掉 es3ify
                {
                   test: /\.js$/,
                   loaders: ['es3ify']
                }
            ],
            loaders: [
                {
                    // 将 md 增加到 babel 编译是为了支持 ````js console.log() ```` 语法
                    test: /\.(js|md)$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: [
                             "es2015",
                             "react"
                        ]
                    }
                },
                {
                   test: /\.css$/,
                   loader: "style!css"
                }
            ]
        },
        resolve: {
            alias: webpackResolveAlias
        }
    })
})


// markrun
var markrun = require('markrun')
fis.match('*.md', {
    rExt: '.html',
    parser: function (content, file) {
        var html = markrun(content, {
            lang: {
                js: function (source) {
                    result = fis.compile.partial(source, file, {
                       ext: 'js'
                    });
                    return {
                        type: 'js',
                        code: result
                    }
                }
            },
            template: require('fs').readFileSync(__dirname + '/doc/markrun-template.html').toString()
        })
        html = html.replace(/href="([^"]+)\.md"/g, 'href="$1.html"')
        return html
    }
})
fis.match('(**)README.md', {
    release: '$1index'
})
fis.match('{_fastboot/**,markrun-template.html}', {
    release: false
}, 999)

// 过滤文件
var ignoreFile = [
    'fis-conf.js',
    'npm-debug.log',
    'node_modules/**',
    '_fastboot',
    '_gh-pages/**',
    'gh-pages/**'
]
fis.match('{' + ignoreFile.join(',') + '}', {
    release: false
})

fis.media('npm').match('*.md', {
    rExt: 'md',
    parser:[]
})
