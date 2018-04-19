"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuleFactory_1 = require("../domain/factories/RuleFactory");
const ParameterType_1 = require("../domain/enumerators/ParameterType");
const ConditionType_1 = require("../domain/enumerators/ConditionType");
const ActionType_1 = require("../domain/enumerators/ActionType");
class TestController {
    ruleFactoryTest(req, res) {
        var rule = RuleFactory_1.default.Mount(req.body);
        res.json(rule);
    }
    ruleFactoryTestMock(req, res) {
        var input = {
            rules: [
                {
                    conditions: [
                        {
                            parameterLeft: { type: ParameterType_1.default.EntityProperty,
                                entity: 'beneficiario', property: 'idade' },
                            type: ConditionType_1.default.GreaterOrEquals,
                            parameterRight: { type: ParameterType_1.default.FixedValue, value: 18 },
                            expectedResult: true
                        }
                    ],
                    actionsThen: [
                        {
                            parameterLeft: { entity: 'autorizacaoItem', property: 'autorizaCompra' },
                            type: ActionType_1.default.SetValue,
                            parameterRight: { type: ParameterType_1.default.FixedValue, value: true }
                        }
                    ],
                    actionsElse: [
                        {
                            parameterLeft: { entity: 'autorizacaoItem', property: 'autorizaCompra' },
                            type: ActionType_1.default.SetValue,
                            parameterRight: { type: ParameterType_1.default.FixedValue, value: false }
                        }
                    ]
                }
            ]
        };
        var rule = RuleFactory_1.default.Mount(input);
        res.json(rule);
    }
}
exports.default = new TestController();
//# sourceMappingURL=TestController.js.map