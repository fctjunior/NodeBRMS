import IParameter from './IParameter'

export default class ParameterFixedValue implements IParameter {

    constructor(private _value:any) {
        if (_value == null)
            throw new Error('ParameterFixedValue.constructor: Invalid parameter: value')
    }

    public GetValue(contextEntities:Object) {
        return this._value;
    }
}
