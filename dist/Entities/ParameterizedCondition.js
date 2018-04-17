"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParameterizedCondition {
    constructor(_parameterLeft, _condition, _parameterRight, _expectedResult = true) {
        this._parameterLeft = _parameterLeft;
        this._condition = _condition;
        this._parameterRight = _parameterRight;
        this._expectedResult = _expectedResult;
    }
    Evaluate(contextEntities) {
        var valueLeft = this._parameterLeft.GetValue(contextEntities);
        var valueRight = this._parameterRight.GetValue(contextEntities);
        return this._condition(valueLeft, valueRight) == this._expectedResult;
    }
}
exports.default = ParameterizedCondition;
