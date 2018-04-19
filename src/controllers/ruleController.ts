
import Rule from '../domain/entities/Rule'
import RuleFactory from '../domain/factories/RuleFactory'
import ParameterizedAction from '../domain/entities/ParameterizedAction'
import ParameterizedCondition from '../domain/entities/ParameterizedCondition'
import ParameterFixedValue from '../domain/entities/ParameterFixedValue'
import ParameterEntityProperty from '../domain/entities/ParameterEntityProperty'
import PerformanceWatcher from '../domain/entities/PerformanceWatcher'

class RuleController {

    public welcome(req, res) {
        res.send('Welcome to BRMS API');
    }

    public executeRule(req, res) {
        var contextEntities =  req.body.contextEntities;
      
        //TODO: it might be inside a rule, so every rule monitor it's timing
        var start = PerformanceWatcher.getStart();

        var rules = RuleFactory.Mount(req.body);

        rules.forEach(rule => {
          rule.Execute(contextEntities);
        });

        contextEntities['ElapsedTimeNS'] = PerformanceWatcher.getElapsed(start);

        res.json(contextEntities);
    }
}

export default new RuleController();