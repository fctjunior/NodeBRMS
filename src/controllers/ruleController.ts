
import Rule from '../entities/Rule'
import RuleFactory from '../factories/RuleFactory'
import ParameterizedAction from '../entities/ParameterizedAction'
import ParameterizedCondition from '../entities/ParameterizedCondition'
import ParameterFixedValue from '../entities/ParameterFixedValue'
import ParameterEntityProperty from '../entities/ParameterEntityProperty'
import PerformanceWatcher from '../entities/PerformanceWatcher'

class RuleController {

    public welcome(req, res) {
        res.send('Welcome to BRMS API');
    }

    public executeRule(req, res) {
        var contextEntities =  req.body.contextEntities;
      
        //TODO: it might be inside a rule, so every rule monitor it's timing
        var start = PerformanceWatcher.getStart();

        var rules = RuleFactory.Mount(req.body);

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

        contextEntities['ElapsedTimeNS'] = PerformanceWatcher.getElapsed(start);

        res.json(contextEntities);
    }

    public executeRuleMock(req, res) {
        var contextEntities =  req.body;

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
        
        //TODO: it might be inside a rule, so every rule monitor it's timing
        var start = PerformanceWatcher.getStart();
          
        rule.Execute(contextEntities);
  
        contextEntities['ElapsedTimeNS'] = PerformanceWatcher.getElapsed(start);

        res.json(contextEntities);
    }

    public executePerformanceTest(req, res) {
             
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
        
        var start = PerformanceWatcher.getStart();
  
        for(var i = 0; i < 1000000; i++)  //10 millions - 900ms
          rule.Execute(contextEntities);
          
        contextEntities['TotalElapsedTimeNS'] = PerformanceWatcher.getElapsed(start);

        res.json(contextEntities);
    }       
}

export default new RuleController();