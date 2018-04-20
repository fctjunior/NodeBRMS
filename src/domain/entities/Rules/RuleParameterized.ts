import IRule from './IRule';
import IAction from '../Actions/IAction'
import ICondition from '../Conditions/ICondition';

export default class RuleParameterized implements IRule {

    public parameterizedActionsInit : Array<IAction> = [];

    public parameterizedConditions : Array<ICondition> = [];

    public parameterizedActionsThen : Array<IAction> = [];

    public parameterizedActionsElse : Array<IAction> = [];

    public EvaluateAllConditions(contextEntities:Object):boolean {

        for (let i = 0; i < this.parameterizedConditions.length; i++) {
            if (!this.parameterizedConditions[i].Evaluate(contextEntities))
                return false;
        }
        
        return true;
    }
    
    public Execute(contextEntities:Object) {
        for (let i = 0; i < this.parameterizedActionsInit.length; i++) 
            this.parameterizedActionsInit[i].Apply(contextEntities);   

        var actionsToExecute =
            this.EvaluateAllConditions(contextEntities)?
            this.parameterizedActionsThen:
            this.parameterizedActionsElse;
        
        for (let i = 0; i < actionsToExecute.length; i++) 
            actionsToExecute[i].Apply(contextEntities);        
    }
}