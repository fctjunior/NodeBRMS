import IParameter from './IParameter'

class ParameterEntityProperty implements IParameter {

    constructor(private _entityName:string, private _propertyName:string) {
    }

    public GetValue(contextEntities:Object) {
        return contextEntities[this._entityName][this._propertyName];
    }
    
    public SetValue(contextEntities:Object, value:any) {
        return contextEntities[this._entityName][this._propertyName] = value;
    }
}

export default ParameterEntityProperty;