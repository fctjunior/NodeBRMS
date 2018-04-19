"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParameterEntityProperty {
    constructor(_entityName, _propertyName) {
        this._entityName = _entityName;
        this._propertyName = _propertyName;
        if (_entityName == null)
            throw new Error('invalid _entityName');
        if (_propertyName == null)
            throw new Error('invalid _propertyName');
    }
    GetValue(contextEntities) {
        return contextEntities[this._entityName][this._propertyName];
    }
    SetValue(contextEntities, value) {
        return contextEntities[this._entityName][this._propertyName] = value;
    }
}
exports.default = ParameterEntityProperty;
