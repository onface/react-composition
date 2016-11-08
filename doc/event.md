# 事件触发时机

> 本业用于理解事件触发时机，不需要读懂本页diamante
> 确保你是在线访问本页面 https://fast-flow.github.io/react-composition/doc/event.html 或 https://fast-flow.github.io/react-composition/{版本号}/doc/event.html

````html
<div class="status" id="onFocus-status" >
    <span class="status-label">onFocus:</span>
    <span class="status-icon"></span>
    <code id="onFocus-statusValue"></code>
</div>
<div class="status" id="onChange-status" >
    <span class="status-label">onChange:</span>
    <span class="status-icon"></span>
    <code id="onChange-statusValue"></code>
</div>
<div class="status" id="onBlur-status" >
    <span class="status-label">onBlur:</span>
    <span class="status-icon"></span>
    <code id="onBlur-statusValue"></code>
</div>
<div class="status" id="onCompositionStart-status" >
    <span class="status-label">onCompositionStart:</span>
    <span class="status-icon"></span>
    <code id="onCompositionStart-statusValue"></code>
</div>
<div class="status" id="onCompositionUpdate-status" >
    <span class="status-label">onCompositionUpdate:</span>
    <span class="status-icon"></span>
    <code id="onCompositionUpdate-statusValue"></code>
</div>
<div class="status" id="onCompositionEnd-status" >
    <span class="status-label">onCompositionEnd:</span>
    <span class="status-icon"></span>
    <code id="onCompositionEnd-statusValue"></code>
</div>
<hr>
<div id="event"></div>
打开控制台查看原生事件触发记录
````
````css
html .status--on .status-icon{
    background-color: #2fc72f;
}
.status-label {
    display: inline-block;
    width:200px;
}
.status-icon {
    background-color:#ddd;
    border-radius:50%;
    width:1em;
    height:1em;
    vertical-align: middle;
    display: inline-block;
    overflow:hidden;
}
textarea {
    border:1px solid #999;
    border-radius:3px;
    width:100%;
    box-sizing: border-box;
}
````

````js
var React = require('react')
var ReactDOM = require('react-dom')

var _count = 0;
window.count = function () {
    ++_count
    return ('00000000' + _count).replace(/.*(\d{3})$/,'$1')
}
var logs = []
window.updateStatus = function (fnName, value, count) {
    var eStatus = document.getElementById(fnName + '-status')
    var eStatusValue = document.getElementById(fnName + '-statusValue')
    eStatus.setAttribute('class', 'status status--on')
    eStatusValue.innerHTML = count + '|' + value
    setTimeout(function () {
        eStatus.setAttribute('class', 'status')
    }, 300)
    logs.push({
        'event': fnName,
        'value': value,
        'count': count
    })
    console.log('原生事件触发记录')
    console.table(logs)
}

var App = React.createClass({
    getInitialState: function () {
        var value = '123'
        return {
            value: value,
            finalValue: value,
            inComposition: false
        }
    },
    // 简化 redux
    ms: function (action) {
        var state = this.state
        var props = this.props
        var data = action.data
        switch (action.type) {
            case 'CHANGE_VALUE':
                if (!state.inComposition) {
                    if (data.value.length > props.maxLength) {
                        data.value = data.value.slice(0, props.maxLength)
                    }
                    state.finalValue = data.value
                }
                state.value = data.value
            break
            case 'COMPOSITION_START':
                state.inComposition = true
            break
            case 'COMPOSITION_END':
                state.inComposition = false
                state.finalValue = data.value
            break
        }
        this.setState(state)
    },
    render: function () {
        var self = this
        var props = {
            onFocus: function (event) {
                updateStatus('onFocus', event.target.value, count())
            },
            onChange: function (event) {
                updateStatus('onChange', event.target.value, count())
                self.ms({
                    type: 'CHANGE_VALUE',
                    data: {
                        value: event.target.value
                    }
                })
            },
            onBlur: function (event) {
                console.log(self.state.finalValue)
                updateStatus('onBlur', event.target.value, count())
            },
            onCompositionStart: function (event) {
                self.ms({
                    type: 'COMPOSITION_START'
                })
                updateStatus('onCompositionStart', event.target.value, count())
            },
            onCompositionUpdate: function (event) {
                updateStatus('onCompositionUpdate', event.target.value, count())
            },
            onCompositionEnd: function (event) {
                self.ms({
                    type: 'COMPOSITION_END',
                    data: {
                        value: event.target.value
                    }
                })
                updateStatus('onCompositionEnd', event.target.value, count())
            }
        }
        return (
            <div>
                <div>
                finalValue: {self.state.finalValue}
                <br />
                value: {self.state.value}
                <br />
                字数：{self.state.finalValue.length}/10
                <br />
                还可以输入：{self.props.maxLength - self.state.finalValue.length}个字
                </div>
                <hr />
                请在输入法模式和非输入法模式下输入文字，以理解事件触发时机 （为了兼容 chrome 某些版本，在 onCompositionEnd 时会触发代理的 onChange ）
                <br />
                <textarea type="text" {...props} value={self.state.value} />
            </div>
        )
    }
})
ReactDOM.render(<App maxLength={10} />, document.getElementById('event'))
````

## 项目作者专用测试

````html
<div id="authorDemo"></div>
````
````js
var React = require('react')
var ReactDOM = require('react-dom')
var reactComposition = require('react-composition')
var App = React.createClass({
    getInitialState: function () {
        var value = '123'
        return {
            value: value,
            finalValue: value
        }
    },
    render: function () {
        var self = this
        return (
            <div>
                value: {self.state.value}
                <br />
                finalValue: {self.state.finalValue}
                <br />
                <textarea
                    {...reactComposition({
                        onChange: function (event) {
                            console.log(event.reactComposition)
                            if (event.reactComposition.composition === false) {
                                self.setState({
                                    finalValue: event.target.value
                                })
                            }
                            self.setState({
                                value: event.target.value
                            })
                        }
                        //,
                        // onCompositionStart: function (event) {},
                        // onCompositionUpdate: function (event) {},
                        // onCompositionEnd: function (event) {}
                    })}
                    value={self.state.value}
                />
            </div>
        )
    }
})
ReactDOM.render(<App />, document.getElementById('authorDemo'))
````
