"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rule {
    constructor() {
        this.parameterizedConditions = [];
        this.parameterizedActionsThen = [];
        this.parameterizedActionsElse = [];
    }
    EvaluateAllConditions(contextEntities) {
        for (let i = 0; i < this.parameterizedConditions.length; i++) {
            if (!this.parameterizedConditions[i].Evaluate(contextEntities))
                return false;
        }
        return true;
    }
    Execute(contextEntities) {
        var actionsToExecute = this.EvaluateAllConditions(contextEntities) ?
            this.parameterizedActionsThen :
            this.parameterizedActionsElse;
        for (let i = 0; i < actionsToExecute.length; i++) {
            actionsToExecute[i].Apply(contextEntities);
        }
    }
}
exports.default = Rule;
