"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParameterFixedValue {
    constructor(_value) {
        this._value = _value;
    }
    GetValue(contextEntities) {
        return this._value;
    }
}
exports.default = ParameterFixedValue;
