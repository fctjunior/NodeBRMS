"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const RuleController_1 = require("./controllers/RuleController");
const TestController_1 = require("./controllers/TestController");
class App {
    constructor() {
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.mountRoutes();
    }
    mountRoutes() {
        const router = express.Router();
        router.post('/brms', RuleController_1.default.executeRule)
            .get('/brms', RuleController_1.default.executePerformanceTest);
        router.post('/testRuleFactory', TestController_1.default.ruleFactoryTest)
            .get('/testRuleFactory', TestController_1.default.ruleFactoryTestMock);
        this.express.use('/', router);
    }
}
exports.default = new App().express;
