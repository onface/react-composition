# react-composition

> 解决 React 中文输入法导致的 ni&#39;hao 数据更新问题


- Online: https://onface.github.io/react-composition/

---

- [doc](./doc/)

## 安装

```shell
npm i react-composition --save
```

## 输入文字和最终文字


````html
<div id="demo"></div>
````

````js
var React = require('react')
var ReactDOM = require('react-dom')
var reactComposition = require('react-composition')
var App = React.createClass({
    getInitialState: function() {
        var value = '123'
        return {
            value: value,
            finalValue: value
        }
    },
    render: function() {
        var self = this
        return (
            <div>
                state.finalValue: {self.state.finalValue}
                <br />
                state.value: {self.state.value}
                <br />
                <input type="text" {...reactComposition({
                    onChange: function (event) {
                        var value = event.target.value
                        if (event.reactComposition.composition === false) {
                            self.setState({
                                finalValue: value
                            })
                        }
                        self.setState({
                            value: value
                        })
                    }
                    /*
                    ,
                    onCompositionStart: function (event) {},
                    onCompositionUpdate: function (event) {},
                    onCompositionEnd: function (event) {}
                    */
                    // 若要监听原生的 onCompositionStart|Update|End 事件
                    // 需在 reactComposition(settings) 的 settings 中绑定回调函数
                })}
                value={self.state.value}
                 />
            </div>
        )
    }
})
ReactDOM.render(<App />, document.getElementById('demo'))
````

## 字数最大限制

````html
<div id="max"></div>
````

````js
var React = require('react')
var ReactDOM = require('react-dom')
var reactComposition = require('react-composition')
var App = React.createClass({
    getInitialState: function() {
        var value = '123'
        return {
            value: value,
            finalValue: value
        }
    },
    render: function() {
        var self = this
        return (
            <div>
                <input type="text" {...reactComposition({
                    onChange: function (event) {
                        var value = event.target.value
                        if (event.reactComposition.composition === false) {
                            if (value.length > self.props.max) {
                                value = value.slice(0, self.props.max)
                            }
                            self.setState({
                                finalValue: value
                            })
                        }
                        self.setState({
                            value: value
                        })
                    }
                    /*
                    ,
                    onCompositionStart: function (event) {},
                    onCompositionUpdate: function (event) {},
                    onCompositionEnd: function (event) {}
                    */
                    // 若要监听原生的 onCompositionStart|Update|End 事件
                    // 需在 reactComposition(settings) 的 settings 中绑定回调函数
                })}
                value={self.state.value}
                 />
                 {this.state.finalValue.length}/{self.props.max}
            </div>
        )
    }
})
ReactDOM.render(<App max={10} />, document.getElementById('max'))
````

## 即时搜索

````html
<div id="search"></div>
````

````js
var React = require('react')
var ReactDOM = require('react-dom')
var reactComposition = require('react-composition')
var App = React.createClass({
    getInitialState: function() {
        var value = '123'
        return {
            value: value,
            finalValue: value,
            ajaxLogs: []
        }
    },
    render: function() {
        var self = this
        return (
            <div>
                <input type="text" {...reactComposition({
                    onChange: function (event) {
                        var value = event.target.value
                        if (event.reactComposition.composition === false) {
                            self.setState({
                                finalValue: value
                            })
                            // You can send ajax
                            var log = 'GET /search?keyword=' + value
                            var ajaxLogs = self.state.ajaxLogs
                            ajaxLogs.unshift(log)
                            self.setState({
                                ajaxLogs: ajaxLogs
                            })
                        }
                        self.setState({
                            value: value
                        })
                    }
                    /*
                    ,
                    onCompositionStart: function (event) {},
                    onCompositionUpdate: function (event) {},
                    onCompositionEnd: function (event) {}
                    */
                    // 若要监听原生的 onCompositionStart|Update|End 事件
                    // 需在 reactComposition(settings) 的 settings 中绑定回调函数
                })}
                value={self.state.value}
                 />
                 <pre>
                    <code>AJAX log:</code>
                     {
                         self.state.ajaxLogs.map(function (item, key) {
                             return (
                                 <div key={key} >
                                    <code >{item}</code>
                                 </div>
                             )
                         })
                     }
                 </pre>
            </div>
        )
    }
})
ReactDOM.render(<App  />, document.getElementById('search'))
````
