import IParameter from '../Parameters/IParameter'
import ParameterEntityProperty from '../Parameters/ParameterEntityProperty'
import IParameterizedAction from './IParameterizedAction';

export default class ParameterizedActionOperation implements IParameterizedAction {

    constructor(
        private _parameterLeft:ParameterEntityProperty, 
        private _action:Function, 
        private _parameterRight:IParameter) {
    }

    public Apply(contextEntities:Object) {
        var valueLeft = this._parameterLeft.GetValue(contextEntities);
        var valueRight = this._parameterRight.GetValue(contextEntities);
        
        this._parameterLeft.SetValue(contextEntities, this._action(valueLeft, valueRight));
    }
}
