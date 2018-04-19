import * as express from 'express'
import * as bodyParser from 'body-parser'
import RuleController from './controllers/RuleController'
import TestController from './controllers/TestController'

class App {
  public express

  constructor () {
    this.express = express()
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()
    
    router.post('/brms', RuleController.executeRule)
          .get('/brms', RuleController.executePerformanceTest);
    
    router.post('/testRuleFactory', TestController.ruleFactoryTest)
          .get('/testRuleFactory', TestController.ruleFactoryTestMock);

    this.express.use('/', router)
  }
}

export default new App().express