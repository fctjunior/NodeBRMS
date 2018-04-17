"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParameterizedAction {
    constructor(_parameterLeft, _action, _parameterRight) {
        this._parameterLeft = _parameterLeft;
        this._action = _action;
        this._parameterRight = _parameterRight;
    }
    Apply(contextEntities) {
        var valueLeft = this._parameterLeft.GetValue(contextEntities);
        var valueRight = this._parameterRight.GetValue(contextEntities);
        this._parameterLeft.SetValue(contextEntities, this._action(valueLeft, valueRight));
    }
}
exports.default = ParameterizedAction;
