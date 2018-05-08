import RuleController from './RuleController'
import TestController from './TestController'

class Routes {
  public mountRoutes (router:any): any {
    
    router.post('/brms', RuleController.executeRule)
          .get('/brms', RuleController.welcome);
    
    router.post('/testRuleFactory', TestController.ruleFactoryTest)
          .get('/testRuleFactory', TestController.ruleFactoryTestMock);

    return router;
  }
}

export default new Routes();