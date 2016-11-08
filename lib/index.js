import extend from "extend"
const reactComposition = function (userSettings) {
    let returnProps = {}
    let defaultSettings = {
        onChange: null,
    }
    let settings = extend(true, defaultSettings, userSettings)
    let defaultReactCompositionStatus = function () {
        return {
            composition: false
        }
    }
    let data = {
        get: function (event) {
            return event.target.__REACT_COMPOSITION_SECRET_DATA || defaultReactCompositionStatus()
        },
        set: function (event, obj) {
            event.target.__REACT_COMPOSITION_SECRET_DATA = obj
        },
        extend: function(event, obj) {
            event.target.__REACT_COMPOSITION_SECRET_DATA = extend(true, event.target.__REACT_COMPOSITION_SECRET_DATA, obj)
        }
    }
    returnProps.onChange = function (event) {
        event.reactComposition = data.get(event)
        if (settings.onChange) {
            settings.onChange(event)
        }
    }
    returnProps.onCompositionStart = function (event) {
        if (settings.onCompositionStart) {
            settings.onCompositionStart(event)
        }
        data.extend(
            event,
            {
                composition: true
            }
        )
    }
    returnProps.onCompositionUpdate = function (event) {
        if (settings.onCompositionUpdate) {
            settings.onCompositionUpdate(event)
        }
    }
    returnProps.onCompositionEnd = function (event) {
        if (settings.onCompositionEnd) {
            settings.onCompositionEnd(event)
        }
        data.extend(
            event,
            {
                composition: false
            }
        )
        // chrome 某些版本 onCompositionEnd 执行时间在 onChange 之后
        // 大部分浏览器执行实际是 onCompositionEnd 在 onChange 之前
        event.reactComposition = data.get(event)
        settings.onChange(event)
    }
    return returnProps
}
export default reactComposition
module.exports = reactComposition
