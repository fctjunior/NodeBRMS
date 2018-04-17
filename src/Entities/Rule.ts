import ParameterizedAction from './ParameterizedAction'
import ParameterizedCondition from './ParameterizedCondition'

class Rule {

    constructor() { }

    public parameterizedConditions : Array<ParameterizedCondition> = [];

    public parameterizedActionsThen : Array<ParameterizedAction> = [];

    public parameterizedActionsElse : Array<ParameterizedAction> = [];

    public EvaluateAllConditions(contextEntities:Object):boolean {

        for (let i = 0; i < this.parameterizedConditions.length; i++) {
            if (!this.parameterizedConditions[i].Evaluate(contextEntities))
                return false;
        }

        return true;
    }
    
    public Execute(contextEntities:Object) {
        var actionsToExecute =
            this.EvaluateAllConditions(contextEntities)?
            this.parameterizedActionsThen:
            this.parameterizedActionsElse;
        
        for (let i = 0; i < actionsToExecute.length; i++) {
            actionsToExecute[i].Apply(contextEntities);
        }
    }
}

export default Rule;