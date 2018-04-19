"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParameterType_1 = require("../enumerators/ParameterType");
const ParameterFixedValue_1 = require("../entities/ParameterFixedValue");
const ParameterEntityProperty_1 = require("../entities/ParameterEntityProperty");
class ParameterFactory {
    Mount(parameter) {
        var type;
        type = parameter.type;
        switch (type) {
            case ParameterType_1.default.FixedValue:
                return new ParameterFixedValue_1.default(parameter.value);
            case ParameterType_1.default.EntityProperty:
                return new ParameterEntityProperty_1.default(parameter.entity, parameter.property);
            case ParameterType_1.default.ListOperation:
                throw new Error('ParameterFactory.Mount: ListOperation - Not implemented');
            default:
                throw new Error('ParameterFactory.Mount: ParameterType - Not implemented');
        }
    }
}
exports.default = new ParameterFactory();
