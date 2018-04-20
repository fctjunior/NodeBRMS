"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuleFactory_1 = require("../domain/factories/RuleFactory");
const ParameterType_1 = require("../domain/enumerators/ParameterType");
const ConditionOperator_1 = require("../domain/enumerators/operators/ConditionOperator");
const ActionOperator_1 = require("../domain/enumerators/operators/ActionOperator");
class TestController {
    ruleFactoryTest(req, res) {
        var rule = RuleFactory_1.default.MountFromJson(req.body);
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
                            type: ConditionOperator_1.default.GreaterOrEquals,
                            parameterRight: { type: ParameterType_1.default.FixedValue, value: 18 },
                            expectedResult: true
                        }
                    ],
                    actionsThen: [
                        {
                            parameterLeft: { entity: 'autorizacaoItem', property: 'autorizaCompra' },
                            type: ActionOperator_1.default.SetValue,
                            parameterRight: { type: ParameterType_1.default.FixedValue, value: true }
                        }
                    ],
                    actionsElse: [
                        {
                            parameterLeft: { entity: 'autorizacaoItem', property: 'autorizaCompra' },
                            type: ActionOperator_1.default.SetValue,
                            parameterRight: { type: ParameterType_1.default.FixedValue, value: false }
                        }
                    ]
                }
            ]
        };
        var rule = RuleFactory_1.default.MountFromJson(input);
        res.json(rule);
    }
}
exports.default = new TestController();
//# sourceMappingURL=TestController.js.map