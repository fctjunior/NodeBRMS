import IRule from './IRule';

export default class RuleCode implements IRule {
   
    constructor(private _code:string) { }

    public Execute(contextEntities:Object) {
        var c = contextEntities;
        eval(this._code);
    }
}