import * as express from 'express'
import Rule from './Entities/Rule'
import ParameterizedAction from './Entities/ParameterizedAction'
import ParameterizedCondition from './Entities/ParameterizedCondition'
import ParameterFixedValue from './Entities/ParameterFixedValue'
import ParameterEntityProperty from './Entities/ParameterEntityProperty'

class App {
  public express

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()

    router.get('/', (req, res) => {
      
      var person =  {
        name : 'tarcisio',
        idade : 29,
        id : 1
      };
      
      var startTime = new Date().getTime();

      //1 billion property getters
      for(var i = 0; i < 1000000000; i++) {
        var prop = person["name"];
      }
      
      var endTime = new Date().getTime();
      var elapsedMS = (endTime - startTime);

      res.json({
        message: `ElapsedTime: ${elapsedMS} ms`
      })
    })

    router.get('/brms', (req, res) => {
      
      /* var contextEntities = req;*/
     
      var contextEntities =  {
        beneficiario : {
          nome : 'Tarcisio',
          sexo : 'M',
          idade : 29
        },
        credenciado : {
          nome : 'Drogaria zézinzin',
          segmento : 25000,
          ativo : true
        },
        autorizacaoItem: {
          quantidadeDigitada : 1,
          autorizaCompra : true,
          precoFinal : 100
        }
      };

      var rule = new Rule();
      
      rule.parameterizedConditions.push(
        new ParameterizedCondition(
          new ParameterEntityProperty('beneficiario','idade'), 
          (pLeft,pRight)=>(pLeft>pRight), 
          new ParameterFixedValue(18), 
          true)
      );

      rule.parameterizedActionsThen.push(
        new ParameterizedAction(
          new ParameterEntityProperty('autorizacaoItem','precoFinal'), 
          (pLeft,pRight)=>(pRight), 
          new ParameterFixedValue(50)
        )
      );
      
      var startTime = new Date().getTime();
      //rule.Execute(contextEntities);

      for(var i = 0; i < 1000000; i++) { //10 millions - 900ms
        rule.Execute(contextEntities);
      }

      var endTime = new Date().getTime();
      var elapsedMS = (endTime - startTime);

      res.json({
        message: `ElapsedTime: ${elapsedMS} ms`,
        contextEntities: contextEntities
      })
    })
    this.express.use('/', router)
  }
}

export default new App().express