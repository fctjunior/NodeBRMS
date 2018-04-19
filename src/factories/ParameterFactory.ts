import IParameter from "../entities/IParameter";
import ParameterType from "../enumerators/ParameterType";
import ParameterFixedValue from "../entities/ParameterFixedValue";
import ParameterEntityProperty from "../entities/ParameterEntityProperty";

class ParameterFactory {
    public Mount(parameter:any): IParameter {
        var type : ParameterType;
        type = parameter.type;

        switch (type) {
            case ParameterType.FixedValue:
                return new ParameterFixedValue(parameter.value);
            case ParameterType.EntityProperty:
                return new ParameterEntityProperty(parameter.entity, parameter.property);
            case ParameterType.ListOperation:
                throw new Error('ParameterFactory.Mount: ListOperation - Not implemented');
            default:
                throw new Error('ParameterFactory.Mount: ParameterType - Not implemented');
        }
    }
}

export default new ParameterFactory();