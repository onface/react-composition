"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extend2 = require("extend");

var _extend3 = _interopRequireDefault(_extend2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reactComposition = function reactComposition(userSettings) {
    var returnProps = {};
    var defaultSettings = {
        onChange: null
    };
    var settings = (0, _extend3["default"])(true, defaultSettings, userSettings);
    var defaultReactCompositionStatus = function defaultReactCompositionStatus() {
        return {
            composition: false
        };
    };
    var data = {
        get: function get(event) {
            return event.target.__REACT_COMPOSITION_SECRET_DATA || defaultReactCompositionStatus();
        },
        set: function set(event, obj) {
            event.target.__REACT_COMPOSITION_SECRET_DATA = obj;
        },
        extend: function extend(event, obj) {
            event.target.__REACT_COMPOSITION_SECRET_DATA = (0, _extend3["default"])(true, event.target.__REACT_COMPOSITION_SECRET_DATA, obj);
        }
    };
    returnProps.onChange = function (event) {
        event.reactComposition = data.get(event);
        if (settings.onChange) {
            settings.onChange(event);
        }
    };
    returnProps.onCompositionStart = function (event) {
        if (settings.onCompositionStart) {
            settings.onCompositionStart(event);
        }
        data.extend(event, {
            composition: true
        });
    };
    returnProps.onCompositionUpdate = function (event) {
        if (settings.onCompositionUpdate) {
            settings.onCompositionUpdate(event);
        }
    };
    returnProps.onCompositionEnd = function (event) {
        if (settings.onCompositionEnd) {
            settings.onCompositionEnd(event);
        }
        data.extend(event, {
            composition: false
        });
        event.reactComposition = data.get(event);
        settings.onChange(event);
    };
    return returnProps;
};
exports["default"] = reactComposition;

module.exports = reactComposition;