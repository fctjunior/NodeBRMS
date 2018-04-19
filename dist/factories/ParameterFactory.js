"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParameterType_1 = require("../enumerators/ParameterType");
const ParameterFixedValue_1 = require("../entities/ParameterFixedValue");
const ParameterEntityProperty_1 = require("../entities/ParameterEntityProperty");
const ParameterEntityPropertyList_1 = require("../entities/ParameterEntityPropertyList");
const ListOperationFactory_1 = require("./ListOperationFactory");
const ParameterizedCondition_1 = require("../entities/ParameterizedCondition");
const ConditionFactory_1 = require("./ConditionFactory");
class ParameterFactory {
    Mount(parameter) {
        var type;
        type = parameter.type;
        switch (type) {
            case ParameterType_1.default.FixedValue:
                return new ParameterFixedValue_1.default(parameter.value);
            case ParameterType_1.default.EntityProperty:
                return new ParameterEntityProperty_1.default(parameter.entity, parameter.property);
            case ParameterType_1.default.EntityPropertyList:
                var listOperation = ListOperationFactory_1.default.Mount(parameter.listOperationType);
                var conditions;
                if (parameter.conditions != null && parameter.conditions.length > 0)
                    parameter.conditions.forEach(c => {
                        var paramLeft = new ParameterFactory().Mount(c.parameterLeft);
                        var condition = ConditionFactory_1.default.Mount(c.type);
                        var paramRight = new ParameterFactory().Mount(c.parameterRight);
                        conditions.push(new ParameterizedCondition_1.default(paramLeft, condition, paramRight, c.expectedResult));
                    });
                var parameterMounted = new ParameterEntityPropertyList_1.default(parameter.entity, parameter.property, listOperation, parameter.aggregateBy);
                parameterMounted.conditions = conditions;
                return parameterMounted;
            default:
                throw new Error('ParameterFactory.Mount: ParameterType - Not implemented');
        }
    }
}
exports.default = new ParameterFactory();
