"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = require("../entities/Rule");
const RuleFactory_1 = require("../factories/RuleFactory");
const ParameterizedAction_1 = require("../entities/ParameterizedAction");
const ParameterizedCondition_1 = require("../entities/ParameterizedCondition");
const ParameterFixedValue_1 = require("../entities/ParameterFixedValue");
const ParameterEntityProperty_1 = require("../entities/ParameterEntityProperty");
const PerformanceWatcher_1 = require("../entities/PerformanceWatcher");
class RuleController {
    welcome(req, res) {
        res.send('Welcome to BRMS API');
    }
    executeRule(req, res) {
        var contextEntities = req.body.contextEntities;
        //TODO: it might be inside a rule, so every rule monitor it's timing
        var start = PerformanceWatcher_1.default.getStart();
        var rules = RuleFactory_1.default.Mount(req.body);
        console.log('rules');
        console.log(rules);
        rules.forEach(rule => {
            console.log('rulex');
            console.log(rule);
            rule.parameterizedConditions.forEach(c => {
                console.log('condition');
                console.log(c);
            });
        });
        rules.forEach(rule => {
            rule.Execute(contextEntities);
        });
        contextEntities['ElapsedTimeNS'] = PerformanceWatcher_1.default.getElapsed(start);
        res.json(contextEntities);
    }
    executeRuleMock(req, res) {
        var contextEntities = req.body;
        var rule = new Rule_1.default();
        rule.parameterizedConditions.push(new ParameterizedCondition_1.default(new ParameterEntityProperty_1.default('beneficiario', 'idade'), (pLeft, pRight) => (pLeft > pRight), new ParameterFixedValue_1.default(18), true));
        rule.parameterizedActionsThen.push(new ParameterizedAction_1.default(new ParameterEntityProperty_1.default('autorizacaoItem', 'precoFinal'), (pLeft, pRight) => (pRight), new ParameterFixedValue_1.default(50)));
        //TODO: it might be inside a rule, so every rule monitor it's timing
        var start = PerformanceWatcher_1.default.getStart();
        rule.Execute(contextEntities);
        contextEntities['ElapsedTimeNS'] = PerformanceWatcher_1.default.getElapsed(start);
        res.json(contextEntities);
    }
    executePerformanceTest(req, res) {
        var contextEntities = {
            beneficiario: {
                nome: 'Tarcisio',
                sexo: 'M',
                idade: 29
            },
            credenciado: {
                nome: 'Drogaria zézinzin',
                segmento: 25000,
                ativo: true
            },
            autorizacaoItem: {
                quantidadeDigitada: 1,
                autorizaCompra: true,
                precoFinal: 100
            }
        };
        var rule = new Rule_1.default();
        rule.parameterizedConditions.push(new ParameterizedCondition_1.default(new ParameterEntityProperty_1.default('beneficiario', 'idade'), (pLeft, pRight) => (pLeft > pRight), new ParameterFixedValue_1.default(18), true));
        rule.parameterizedActionsThen.push(new ParameterizedAction_1.default(new ParameterEntityProperty_1.default('autorizacaoItem', 'precoFinal'), (pLeft, pRight) => (pRight), new ParameterFixedValue_1.default(50)));
        var start = PerformanceWatcher_1.default.getStart();
        for (var i = 0; i < 1000000; i++)
            rule.Execute(contextEntities);
        contextEntities['TotalElapsedTimeNS'] = PerformanceWatcher_1.default.getElapsed(start);
        res.json(contextEntities);
    }
}
exports.default = new RuleController();
