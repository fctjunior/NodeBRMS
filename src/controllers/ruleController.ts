
import RuleFactory from '../domain/factories/RuleFactory'
import PerformanceWatcher from '../infrastructure-cross-utils/PerformanceWatcher'

class RuleController {

    public welcome(req, res) {
        res.send('Welcome to BRMS API');
    }

    public executeRule(req, res) {
        var contextEntities =  req.body.contextEntities;
      
        //TODO: it might be inside a rule, so every rule monitor it's timing
        var start = PerformanceWatcher.getStart();

        var rules = RuleFactory.MountFromJson(req.body);

        rules.forEach(rule => {
          rule.Execute(contextEntities);
        });

        contextEntities['ElapsedTimeNS'] = PerformanceWatcher.getElapsed(start);

        res.json(contextEntities);
    }
}

export default new RuleController();