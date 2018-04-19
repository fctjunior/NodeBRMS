import RuleFactory from "../domain/factories/RuleFactory";
import ParameterType from "../domain/enumerators/ParameterType";
import ConditionType from "../domain/enumerators/ConditionType";
import ActionType from "../domain/enumerators/ActionType";

class TestController {

    public ruleFactoryTest(req, res) {
        var rule = RuleFactory.Mount(req.body);
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
                                type : ConditionType.GreaterOrEquals,
                                parameterRight : { type : ParameterType.FixedValue, value : 18 },
                                expectedResult : true
                            }
                        ],
                        actionsThen : [
                            {
                                parameterLeft : { entity:'autorizacaoItem', property:'autorizaCompra' },
                                type : ActionType.SetValue,
                                parameterRight : { type : ParameterType.FixedValue, value : true }
                            }
                        ],
                        actionsElse : [
                            {
                                parameterLeft : { entity:'autorizacaoItem', property:'autorizaCompra' },
                                type : ActionType.SetValue,
                                parameterRight : { type : ParameterType.FixedValue, value : false }
                            }
                        ]
                    }
                ]
            }

        var rule = RuleFactory.Mount(input);
        res.json(rule);
    }
}

export default new TestController();