import IParameter from './IParameter'
import ComplexPropertyReader from '../../infrastructure-cross-utils/ComplexPropertyReader';

export default class ParameterEntityProperty implements IParameter {

    constructor(private _entityName:string, private _propertyName:string) {
        if (_entityName == null)
            throw new Error('invalid _entityName');
            
        if (_propertyName == null)
            throw new Error('invalid _propertyName');
    }

    public GetValue(contextEntities:Object) {
        return ComplexPropertyReader.getValue(contextEntities[this._entityName], this._propertyName);
    }
    
    public SetValue(contextEntities:Object, value:any) {
        return ComplexPropertyReader.setValue(contextEntities[this._entityName], this._propertyName, value);
    }
}
