import IParameterizedAction from './IParameterizedAction';
import Rule from '../Rules/Rule';

export default class ParameterizedActionRule implements IParameterizedAction {

    constructor(private _rule:Rule) { }

    public Apply(contextEntities:Object) {
        this._rule.Execute(contextEntities);
    }
}
