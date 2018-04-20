import IParameter from '../Parameters/IParameter'
import IParameterizedCondition from './IParameterizedCondition'

export default class ParameterizedCondition implements IParameterizedCondition {

    constructor(
        private _parameterLeft:IParameter, 
        private _condition:Function, 
        private _parameterRight:IParameter,
        private _expectedResult:boolean=true) {
    }

    public Evaluate(contextEntities:Object) {
        var valueLeft = this._parameterLeft.GetValue(contextEntities);
        var valueRight = this._parameterRight.GetValue(contextEntities);
        
        return this._condition(valueLeft, valueRight) == this._expectedResult;
    }
}