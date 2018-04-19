import ActionType from '../enumerators/ActionType'
import ConditionType from '../enumerators/ConditionType'
import ParameterType from '../enumerators/ParameterType'
import ActionFactory from './ActionFactory';
import ConditionFactory from './ConditionFactory';
import ParameterFactory from './ParameterFactory';
import Rule from '../entities/Rule'
import ParameterizedAction from '../entities/ParameterizedAction';
import ParameterizedCondition from '../entities/ParameterizedCondition';
import ParameterEntityProperty from '../entities/ParameterEntityProperty';

//Recursively mount a rule from a JSON
class RuleFactory {
    public Mount(input):Array<Rule> {

        /*
        input = {
            "rules" : [
                {
                    "conditions" : [
                        { 
                            "parameterLeft" : { "type" : 0, "entity":'beneficiario', "property" : "idade" },
                            "type" : 3,
                            "parameterRight" : { "type" : 1, "value" : 18 },
                            "expectedResult" : true
                        }
                    ],
                    "actionsThen" : [
                        {
                            "parameterLeft" : { "entity" : "autorizacaoItem", "property" : "autorizaCompra" },
                            "type" : 0,
                            "parameterRight" : { "type" : 1, "value" : true }
                        }
                    ],
                    "actionsElse" : [
                        {
                            "parameterLeft" : { "entity" : "autorizacaoItem", "property" : "autorizaCompra" },
                            "type" : 0,
                            "parameterRight" : { "type" : 1, "value" : false }
                        }
                    ]
                }
            ]
        };
        */
        
        if (input.rules == null || input.rules.length === 0)
            throw new Error('Nenhuma rule foi especificada');

        var rules : Array<Rule> = [];
        
        input.rules.forEach(currentRule => {            
            var rule = new Rule();

            if (currentRule.conditions != null && currentRule.conditions.length > 0) 
                currentRule.conditions.forEach(c => {
                    var paramLeft = ParameterFactory.Mount(c.parameterLeft);
                    var condition = ConditionFactory.Mount(c.type);
                    var paramRight = ParameterFactory.Mount(c.parameterRight);

                    rule.parameterizedConditions.push(
                        new ParameterizedCondition(paramLeft, condition, paramRight, c.expectedResult));
                });

            if (currentRule.actionsThen != null && currentRule.actionsThen.length > 0) 
                currentRule.actionsThen.forEach(a => {
                    var paramLeft = 
                        new ParameterEntityProperty(a.parameterLeft.entity, a.parameterLeft.property);
                    var action = ActionFactory.Mount(a.type);
                    var paramRight = ParameterFactory.Mount(a.parameterRight);

                    rule.parameterizedActionsThen.push(
                        new ParameterizedAction(paramLeft, action, paramRight));
                });

            if (currentRule.actionsElse != null && currentRule.actionsElse.length > 0) 
                currentRule.actionsElse.forEach(a => {
                    var paramLeft = 
                        new ParameterEntityProperty(a.parameterLeft.entity, a.parameterLeft.property);
                    var action = ActionFactory.Mount(a.type);
                    var paramRight = ParameterFactory.Mount(a.parameterRight);

                    rule.parameterizedActionsElse.push(
                        new ParameterizedAction(paramLeft, action, paramRight));
                });
            
            rules.push(rule);
        });

        return rules;
    }
}

export default new RuleFactory();