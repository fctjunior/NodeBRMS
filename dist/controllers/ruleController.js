"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RuleFactory_1 = require("../domain/factories/RuleFactory");
const PerformanceWatcher_1 = require("../infrastructure-cross-utils/PerformanceWatcher");
class RuleController {
    welcome(req, res) {
        res.send('Welcome to BRMS API');
    }
    executeRule(req, res) {
        var contextEntities = req.body.contextEntities;
        //TODO: it might be inside a rule, so every rule monitor it's timing
        var start = PerformanceWatcher_1.default.getStart();
        var rules = RuleFactory_1.default.MountFromJson(req.body);
        rules.forEach(rule => {
            rule.Execute(contextEntities);
        });
        contextEntities['ElapsedTimeNS'] = PerformanceWatcher_1.default.getElapsed(start);
        res.json(contextEntities);
    }
}
exports.default = new RuleController();
//# sourceMappingURL=RuleController.js.map