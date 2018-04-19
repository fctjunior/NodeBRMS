import IParameter from './IParameter'
import ParameterizedCondition from './ParameterizedCondition';

export default class ParameterEntityPropertyList implements IParameter {

    public conditions : Array<ParameterizedCondition> = [];

    constructor(private _entityName:string, 
                private _propertyName:string, 
                private _operation:Function, 
                private _aggregateBy:string) {

        if (_entityName == null)
            throw new Error('invalid _entityName');
            
        if (_propertyName == null)
            throw new Error('invalid _propertyName');
            
        if (_operation == null)
            throw new Error('invalid _operation');
            
        if (_aggregateBy == null)
            throw new Error('invalid _aggregateBy');
    }

    public GetValue(contextEntities:Object) {
        return this._operation(contextEntities, this._entityName, this._propertyName, this._aggregateBy, this.conditions);
    }
}
