import RuleFactory from "../domain/factories/RuleFactory";
import ParameterType from "../domain/enumerators/ParameterType";
import ConditionOperator from "../domain/enumerators/operators/ConditionOperator";
import ActionOperator from "../domain/enumerators/operators/ActionOperator";

class TestController {

    public ruleFactoryTest(req, res) {
        var rule = RuleFactory.MountFromJson(req.body);
        res.json(rule);
    }       

    public ruleFactoryTestMock(req, res) {
        var input = 
            {
                rules : [
                    {
                        conditions : [
                            { 
                                parameterLeft : { type : ParameterType.EntityProperty, 
                                    entity:'beneficiario', property:'idade' },
                                type : ConditionOperator.GreaterOrEquals,
                                parameterRight : { type : ParameterType.FixedValue, value : 18 },
                                expectedResult : true
                            }
                        ],
                        actionsThen : [
                            {
                                parameterLeft : { entity:'autorizacaoItem', property:'autorizaCompra' },
                                type : ActionOperator.SetValue,
                                parameterRight : { type : ParameterType.FixedValue, value : true }
                            }
                        ],
                        actionsElse : [
                            {
                                parameterLeft : { entity:'autorizacaoItem', property:'autorizaCompra' },
                                type : ActionOperator.SetValue,
                                parameterRight : { type : ParameterType.FixedValue, value : false }
                            }
                        ]
                    }
                ]
            }

        var rule = RuleFactory.MountFromJson(input);
        res.json(rule);
    }
}

export default new TestController();