import RuleFactory from "../factories/RuleFactory";
import ParameterType from "../enumerators/ParameterType";
import ConditionType from "../enumerators/ConditionType";
import ActionType from "../enumerators/ActionType";


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