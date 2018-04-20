import IAction from './IAction';
import IRule from '../Rules/IRule';

export default class ActionChainedRule implements IAction {

    constructor(private _rule:IRule) { }

    public Apply(contextEntities:Object) {
        this._rule.Execute(contextEntities);
    }
}
