"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParameterFixedValue {
    constructor(_value) {
        this._value = _value;
        if (_value == null)
            throw new Error('ParameterFixedValue.constructor: Invalid parameter: value');
    }
    GetValue(contextEntities) {
        return this._value;
    }
}
exports.default = ParameterFixedValue;
