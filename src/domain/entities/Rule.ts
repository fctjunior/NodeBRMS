import IParameterizedAction from './ParameterizedAction/IParameterizedAction'
import ParameterizedCondition from './ParameterizedCondition/ParameterizedCondition'

export default class Rule {

    public parameterizedActionsInit : Array<IParameterizedAction> = [];

    public parameterizedConditions : Array<ParameterizedCondition> = [];

    public parameterizedActionsThen : Array<IParameterizedAction> = [];

    public parameterizedActionsElse : Array<IParameterizedAction> = [];

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