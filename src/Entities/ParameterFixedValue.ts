import IParameter from './IParameter'

class ParameterFixedValue implements IParameter {

    constructor(private _value:any) {
    }

    public GetValue(contextEntities:Object) {
        return this._value;
    }
}

export default ParameterFixedValue;