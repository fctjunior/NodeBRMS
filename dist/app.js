"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Rule_1 = require("./Entities/Rule");
const ParameterizedAction_1 = require("./Entities/ParameterizedAction");
const ParameterizedCondition_1 = require("./Entities/ParameterizedCondition");
const ParameterFixedValue_1 = require("./Entities/ParameterFixedValue");
const ParameterEntityProperty_1 = require("./Entities/ParameterEntityProperty");
class App {
    constructor() {
        this.express = express();
        this.mountRoutes();
    }
    mountRoutes() {
        const router = express.Router();
        router.get('/', (req, res) => {
            var person = {
                name: 'tarcisio',
                idade: 29,
                id: 1
            };
            var startTime = new Date().getTime();
            //1 billion property getters
            for (var i = 0; i < 1000000000; i++) {
                var prop = person["name"];
            }
            var endTime = new Date().getTime();
            var elapsedMS = (endTime - startTime);
            res.json({
                message: `ElapsedTime: ${elapsedMS} ms`
            });
        });
        router.get('/brms', (req, res) => {
            /* var contextEntities = req;*/
            var contextEntities = {
                beneficiario: {
                    nome: 'Tarcisio',
                    sexo: 'M',
                    idade: 29
                },
                credenciado: {
                    nome: 'Drogasil',
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
            var startTime = new Date().getTime();
            //rule.Execute(contextEntities);
            for (var i = 0; i < 50000000; i++) {
                rule.Execute(contextEntities);
            }
            var endTime = new Date().getTime();
            var elapsedMS = (endTime - startTime);
            res.json({
                message: `ElapsedTime: ${elapsedMS} ms`,
                contextEntities: contextEntities
            });
        });
        this.express.use('/', router);
    }
}
exports.default = new App().express;
