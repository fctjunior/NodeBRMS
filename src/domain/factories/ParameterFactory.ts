import IParameter from "../entities/IParameter";
import ParameterType from "../enumerators/ParameterType";
import ParameterFixedValue from "../entities/ParameterFixedValue";
import ParameterEntityProperty from "../entities/ParameterEntityProperty";
import ParameterEntityPropertyList from "../entities/ParameterEntityPropertyList";
import ListOperationFactory from "./ListOperationFactory";
import ParameterizedCondition from "../entities/ParameterizedCondition";
import ConditionFactory from "./ConditionFactory";

class ParameterFactory {
    public Mount(parameter:any): IParameter {
        var type : ParameterType;
        type = parameter.type;

        switch (type) {
            case ParameterType.FixedValue:
                return new ParameterFixedValue(parameter.value);
            case ParameterType.EntityProperty:
                return new ParameterEntityProperty(parameter.entity, parameter.property);
            case ParameterType.EntityPropertyList:
                var listOperation = ListOperationFactory.Mount(parameter.listOperationType);
                var conditions : Array<ParameterizedCondition>;

                if (parameter.conditions != null && parameter.conditions.length > 0) 
                parameter.conditions.forEach(c => {
                    var paramLeft = new ParameterFactory().Mount(c.parameterLeft);
                    var condition = ConditionFactory.Mount(c.type);
                    var paramRight = new ParameterFactory().Mount(c.parameterRight);

                    conditions.push(
                        new ParameterizedCondition(paramLeft, condition, paramRight, c.expectedResult));
                });

                var parameterMounted = new ParameterEntityPropertyList(
                    parameter.entity, 
                    parameter.property, 
                    listOperation, 
                    parameter.aggregateBy);

                parameterMounted.conditions = conditions;

                return parameterMounted;
            default:
                throw new Error('ParameterFactory.Mount: ParameterType - Not implemented');
        }
    }
}

export default new ParameterFactory();