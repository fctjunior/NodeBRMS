import ICondition from './ICondition'

export default class ConditionCode implements ICondition {

    constructor(
        private _code:string) {
    }

    public Evaluate(contextEntities:Object) {
        var c = contextEntities;
        return eval(this._code);
    }
}