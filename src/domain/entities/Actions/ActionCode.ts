import IAction from './IAction';

export default class ActionCode implements IAction {

    constructor(private _code:string) { }

    public Apply(contextEntities:Object) {
        var c = contextEntities;
        eval(this._code);
    }
}
