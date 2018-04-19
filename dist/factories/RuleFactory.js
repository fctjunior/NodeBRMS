"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionFactory_1 = require("./ActionFactory");
const ConditionFactory_1 = require("./ConditionFactory");
const ParameterFactory_1 = require("./ParameterFactory");
const Rule_1 = require("../entities/Rule");
const ParameterizedAction_1 = require("../entities/ParameterizedAction");
const ParameterizedCondition_1 = require("../entities/ParameterizedCondition");
const ParameterEntityProperty_1 = require("../entities/ParameterEntityProperty");
//Recursively mount a rule from a JSON
class RuleFactory {
    Mount(input) {
        if (input.rules == null || input.rules.length === 0)
            throw new Error('Nenhuma rule foi especificada');
        var rules = [];
        input.rules.forEach(currentRule => {
            var rule = new Rule_1.default();
            if (currentRule.conditions != null && currentRule.conditions.length > 0)
                currentRule.conditions.forEach(c => {
                    var paramLeft = ParameterFactory_1.default.Mount(c.parameterLeft);
                    var condition = ConditionFactory_1.default.Mount(c.type);
                    var paramRight = ParameterFactory_1.default.Mount(c.parameterRight);
                    rule.parameterizedConditions.push(new ParameterizedCondition_1.default(paramLeft, condition, paramRight, c.expectedResult));
                });
            if (currentRule.actionsThen != null && currentRule.actionsThen.length > 0)
                currentRule.actionsThen.forEach(a => {
                    var paramLeft = new ParameterEntityProperty_1.default(a.parameterLeft.entity, a.parameterLeft.property);
                    var action = ActionFactory_1.default.Mount(a.type);
                    var paramRight = ParameterFactory_1.default.Mount(a.parameterRight);
                    rule.parameterizedActionsThen.push(new ParameterizedAction_1.default(paramLeft, action, paramRight));
                });
            if (currentRule.actionsElse != null && currentRule.actionsElse.length > 0)
                currentRule.actionsElse.forEach(a => {
                    var paramLeft = new ParameterEntityProperty_1.default(a.parameterLeft.entity, a.parameterLeft.property);
                    var action = ActionFactory_1.default.Mount(a.type);
                    var paramRight = ParameterFactory_1.default.Mount(a.parameterRight);
                    rule.parameterizedActionsElse.push(new ParameterizedAction_1.default(paramLeft, action, paramRight));
                });
            rules.push(rule);
        });
        return rules;
    }
}
exports.default = new RuleFactory();
