import IParameterizedAction from './IParameterizedAction';
import Rule from '../Rule';

export default class ParameterizedActionCode implements IParameterizedAction {

    constructor(private _code:string) { }

    public Apply(contextEntities:Object) {
        var c = contextEntities;
        eval(this._code);
    }
}
