import IParameter from './IParameter'
import ParameterEntityProperty from './ParameterEntityProperty'

class ParameterizedAction {

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

export default ParameterizedAction;