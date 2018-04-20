import OperationType from '../enumerators/OperationType'
import ConditionType from '../enumerators/ConditionType'
import ParameterType from '../enumerators/ParameterType'
import OperationFactory from './OperationFactory';
import ConditionFactory from './ConditionFactory';
import ParameterFactory from './ParameterFactory';
import Rule from '../entities/Rule'
import ParameterizedActionOperation from '../entities/ParameterizedAction/ParameterizedActionOperation';
import ParameterizedCondition from '../entities/ParameterizedCondition/ParameterizedCondition';
import ParameterEntityProperty from '../entities/Parameters/ParameterEntityProperty';

class RuleFactory {
    public MountFromJson(input):Array<Rule> {
        
        if (input.rules == null || input.rules.length === 0)
            throw new Error('Nenhuma rule foi especificada');

        var rules : Array<Rule> = [];
        
        input.rules.forEach(currentRule => {            
            var rule = new Rule();

            if (currentRule.conditions != null && currentRule.conditions.length > 0) 
                currentRule.conditions.forEach(c => {
                    var paramLeft = ParameterFactory.MountFromJson(c.parameterLeft);
                    var condition = ConditionFactory.Mount(c.type);
                    var paramRight = ParameterFactory.MountFromJson(c.parameterRight);

                    rule.parameterizedConditions.push(
                        new ParameterizedCondition(paramLeft, condition, paramRight, c.expectedResult));
                });

            if (currentRule.actionsThen != null && currentRule.actionsThen.length > 0) 
                currentRule.actionsThen.forEach(a => {
                    var paramLeft = 
                        new ParameterEntityProperty(a.parameterLeft.entity, a.parameterLeft.property);
                    var action = OperationFactory.Mount(a.type);
                    var paramRight = ParameterFactory.MountFromJson(a.parameterRight);

                    rule.parameterizedActionsThen.push(
                        new ParameterizedActionOperation(paramLeft, action, paramRight));
                });

            if (currentRule.actionsElse != null && currentRule.actionsElse.length > 0) 
                currentRule.actionsElse.forEach(a => {
                    var paramLeft = 
                        new ParameterEntityProperty(a.parameterLeft.entity, a.parameterLeft.property);
                    var action = OperationFactory.Mount(a.type);
                    var paramRight = ParameterFactory.MountFromJson(a.parameterRight);

                    rule.parameterizedActionsElse.push(
                        new ParameterizedActionOperation(paramLeft, action, paramRight));
                });
            
            rules.push(rule);
        });

        return rules;
    }
}

export default new RuleFactory();