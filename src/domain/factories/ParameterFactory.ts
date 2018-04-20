import IParameter from "../entities/Parameters/IParameter";
import ParameterType from "../enumerators/ParameterType";
import ParameterFixedValue from "../entities/Parameters/ParameterFixedValue";
import ParameterEntityProperty from "../entities/Parameters/ParameterEntityProperty";
import ParameterEntityPropertyList from "../entities/Parameters/ParameterEntityPropertyList";
import ListOperationFactory from "./ListOperationFactory";
import ConditionParameterized from "../entities/Conditions/ConditionParameterized";
import ConditionFactory from "./ConditionFactory";

class ParameterFactory {
    public MountFromJson(parameter:any): IParameter {
        var type : ParameterType;
        type = parameter.type;

        switch (type) {
            case ParameterType.FixedValue:
                return new ParameterFixedValue(parameter.value);
            case ParameterType.EntityProperty:
                return new ParameterEntityProperty(parameter.entity, parameter.property);
            case ParameterType.EntityPropertyList:
                var listOperation = ListOperationFactory.Mount(parameter.listOperationType);
                var conditions : Array<ConditionParameterized>;

                if (parameter.conditions != null && parameter.conditions.length > 0) 
                parameter.conditions.forEach(c => {
                    var paramLeft = new ParameterFactory().MountFromJson(c.parameterLeft);
                    var condition = ConditionFactory.Mount(c.type);
                    var paramRight = new ParameterFactory().MountFromJson(c.parameterRight);

                    conditions.push(
                        new ConditionParameterized(paramLeft, condition, paramRight, c.expectedResult));
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