import IParameterizedCondition from './IParameterizedCondition'

export default class ParameterizedConditionCode implements IParameterizedCondition {

    constructor(
        private _code:string) {
    }

    public Evaluate(contextEntities:Object) {
        var c = contextEntities;
        return eval(this._code);
    }
}