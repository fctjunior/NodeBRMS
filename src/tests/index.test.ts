import * as test from 'tape';
import RuleParameterized from '../domain/entities/Rules/RuleParameterized';
import ConditionParameterized from '../domain/entities/Conditions/ConditionParameterized';
import ParameterEntityProperty from '../domain/entities/Parameters/ParameterEntityProperty';
import ParameterFixedValue from '../domain/entities/Parameters/ParameterFixedValue';
import ActionParameterized from '../domain/entities/Actions/ActionParameterized';
import PerformanceWatcher from '../infrastructure-cross-utils/PerformanceWatcher';
import ConditionFactory from '../domain/factories/ConditionFactory';
import ConditionOperator from '../domain/enumerators/operators/ConditionOperator';
import OperationFactory from '../domain/factories/OperationFactory';
import ActionOperator from '../domain/enumerators/operators/ActionOperator';
import ParameterEntityPropertyList from '../domain/entities/Parameters/ParameterEntityPropertyList';
import ListOperationFactory from '../domain/factories/ListOperationFactory';
import ListOperator from '../domain/enumerators/operators/ListOperator';
import ComplexPropertyReader from '../infrastructure-cross-utils/ComplexPropertyReader';
import ActionChainedRule from '../domain/entities/Actions/ActionChainedRule';
import ActionCode from '../domain/entities/Actions/ActionCode';
import ConditionCode from '../domain/entities/Conditions/ConditionCode';
import RuleCode from '../domain/entities/Rules/RuleCode';


var mockBasicContextEntities = function() {
    var contextEntities =  {
		"beneficiario" : {
			"nome" : "Tarcisio",
			"sexo" : "M",
			"idade" : 29
		},
		"credenciado" : {
			"nome" : "Drogaria zézinzin",
			"segmento" : 25000,
			"ativo" : true
		},
		"autorizacaoItem": {
			"quantidadeDigitada" : 1,
			"autorizaCompra" : true,
			"precoFinal" : 100
        },
        "Autorizacao": {
            "Items" : [
                { ProdutoId : 1, LinhaId : 10, QuantidadeDigitada : 2, ValorFinal : 85}
            ]
        },
        "HistoricoCompras": {
            Items : [
                { ProdutoId : 1, LinhaId : 10, QuantidadeVendida : 1, ValorFinal : 85, Data : new Date(2018,4,1) },
                { ProdutoId : 2, LinhaId : 5,  QuantidadeVendida : 8, ValorFinal : 55, Data : new Date(2018,4,2) },
                { ProdutoId : 1, LinhaId : 10, QuantidadeVendida : 2, ValorFinal : 85, Data : new Date(2018,4,2) },
                { ProdutoId : 1, LinhaId : 10, QuantidadeVendida : 8, ValorFinal : 85, Data : new Date(2018,3,2) }
            ]
        }
    };
    return contextEntities;
}

var mockBasicRule = function(): RuleParameterized {
    var rule = new RuleParameterized();
    rule.parameterizedConditions.push(
        new ConditionParameterized(
        new ParameterEntityProperty('beneficiario','idade'),
        ConditionFactory.Mount(ConditionOperator.GreaterOrEquals), 
        new ParameterFixedValue(18), 
        true)
    );
    rule.parameterizedActionsElse.push(
        new ActionParameterized(
        new ParameterEntityProperty('autorizacaoItem','autorizaCompra'), 
        OperationFactory.Mount(ActionOperator.SetValue), 
        new ParameterFixedValue(false)
        )
    );

    return rule;
}


test('Teste mock',(t) => {
    var teste = 1;
    eval('teste = teste + 1');
    teste++;
    
    var contextEntities = mockBasicContextEntities();

    var rule = new RuleParameterized();
    rule.parameterizedConditions.push(
        new ConditionCode('c.beneficiario.idade > 18')
    );

    rule.parameterizedActionsThen.push(
        new ActionCode("c.beneficiario.nome='chuck norris'"));
    rule.Execute(contextEntities);

    console.log(contextEntities);

    var ruleCode = new RuleCode('if (c.beneficiario.nome =="chuck norris") c.beneficiario.idade = 99');
    ruleCode.Execute(contextEntities);

    console.log(contextEntities);

    t.end();
});

test('Teste regra basico',(t) => {

    var contextEntities = mockBasicContextEntities();
    var rule = mockBasicRule();
    
    rule.Execute(contextEntities);       
    t.assert(contextEntities.autorizacaoItem.autorizaCompra === true, "Aplicou regra basica 1 (true) corretamente");

    contextEntities.beneficiario.idade = 15;
    rule.Execute(contextEntities);
    t.assert(contextEntities.autorizacaoItem.autorizaCompra === false, "Aplicou regra basica 2 (false) corretamente");

    var start = PerformanceWatcher.getStart();

    var qtdIteracoes = 1000000;
    for(var i = 0; i < qtdIteracoes; i++)  
        rule.Execute(contextEntities);
    
    contextEntities['TotalElapsedTimeNS'] = PerformanceWatcher.getElapsed(start);
  
    t.assert(true, 
        "Execucao de " + qtdIteracoes + " de iteracoes em regra basica: " + 
        contextEntities['TotalElapsedTimeNS'] + "s");

    t.end();
});


test('Teste operacoes em lista - SUM',(t) => {

    var contextEntities = mockBasicContextEntities();
    contextEntities["HistoricoCompras"] = {
        Items : [
            { ProdutoId : 1, LinhaId : 10, QuantidadeVendida : 2, ValorFinal : 85, Data : new Date(2018,4,1) },
            { ProdutoId : 1, LinhaId : 10, QuantidadeVendida : 2, ValorFinal : 85, Data : new Date(2018,4,2) },
            { ProdutoId : 2, LinhaId : 5,  QuantidadeVendida : 7, ValorFinal : 55, Data : new Date(2018,4,2) },
            { ProdutoId : 1, LinhaId : 10, QuantidadeVendida : 8, ValorFinal : 85, Data : new Date(2018,3,2) }
        ]
    }

    contextEntities["VariaveisAuxiliares"] = { AuxNumber1 : 0 };
    
    var listOperation1 = new ParameterEntityPropertyList("HistoricoCompras","Items",
        ListOperationFactory.Mount(ListOperator.Sum),"QuantidadeVendida");
    listOperation1.conditions = [
        new ConditionParameterized( new ParameterEntityProperty("$currentListItem","Data"), 
            ConditionFactory.Mount(ConditionOperator.GreaterOrEquals), new ParameterFixedValue(new Date(2018,4,1)), true),
        new ConditionParameterized( new ParameterEntityProperty("$currentListItem","LinhaId"), 
            ConditionFactory.Mount(ConditionOperator.Equals), new ParameterFixedValue(10), true)
    ];

    var actionSomarHistorico = new ActionParameterized(
            new ParameterEntityProperty('VariaveisAuxiliares','AuxNumber1'), 
            OperationFactory.Mount(ActionOperator.SetValue), 
            listOperation1);
    
    var listOperation2 = new ParameterEntityPropertyList("Autorizacao","Items",
        ListOperationFactory.Mount(ListOperator.Sum),"QuantidadeDigitada");
    listOperation2.conditions = [
        new ConditionParameterized( new ParameterEntityProperty("$currentListItem","LinhaId"), 
            ConditionFactory.Mount(ConditionOperator.Equals), new ParameterFixedValue(10), true)
    ];

    var actionSomarItensAutorizacao = new ActionParameterized(
            new ParameterEntityProperty('VariaveisAuxiliares','AuxNumber1'), 
            OperationFactory.Mount(ActionOperator.Sum), 
            listOperation2
    );

    var rule = new RuleParameterized();

    rule.parameterizedActionsInit.push(actionSomarHistorico);
    rule.parameterizedActionsInit.push(actionSomarItensAutorizacao);
    rule.parameterizedConditions.push(
        new ConditionParameterized(
        new ParameterEntityProperty('VariaveisAuxiliares','AuxNumber1'),
        ConditionFactory.Mount(ConditionOperator.GreaterOrEquals), 
        new ParameterFixedValue(8), 
        true)
    );
    rule.parameterizedActionsThen.push(
        new ActionParameterized(
        new ParameterEntityProperty('autorizacaoItem','autorizaCompra'), 
        OperationFactory.Mount(ActionOperator.SetValue), 
        new ParameterFixedValue(false)
        )
    );    

    rule.Execute(contextEntities);       
    t.assert(contextEntities.autorizacaoItem.autorizaCompra === true, "Aplicou regra de lista 1 (true) corretamente");

    contextEntities.Autorizacao.Items = [
        { ProdutoId : 1, LinhaId : 10, QuantidadeDigitada : 4, ValorFinal : 85 }
    ]
    
    rule.Execute(contextEntities);       
    t.assert(contextEntities.autorizacaoItem.autorizaCompra === false, "Aplicou regra de lista 2 (false) corretamente");

    //Performance test
    var start = PerformanceWatcher.getStart();

    var qtdIteracoes = 1000000;
    for(var i = 0; i < qtdIteracoes; i++)
        rule.Execute(contextEntities);      
    
    contextEntities['TotalElapsedTimeNS'] = PerformanceWatcher.getElapsed(start);
  
    t.assert(true, 
        "Execucao de " + qtdIteracoes + " de iteracoes em regra de lista: " + 
        contextEntities['TotalElapsedTimeNS'] + "s");

    t.end();
});


test('Teste ComplexPropertyReader',(t) => {

    var myComplexObject =  {
        id  : 1,
        name : 'teste',
        account : {
            id : 7,
            pwd : 'xpto',
            secret : {
                a : 1,
                b : 2,
                adasd : 3
            },
            log : [
                { id: 1, time: 10 },
                { id: 2, time: 15 },
                { id: 3, time: 20 },
            ]
        }
    }


    var result1 = ComplexPropertyReader.getValue(myComplexObject, 'name');
    t.assert(result1 == 'teste', "Aplicou ComplexPropertyReader teste 1 - name");

    var result2 = ComplexPropertyReader.getValue(myComplexObject, 'account.pwd');
    t.assert(result2 == 'xpto', "Aplicou ComplexPropertyReader teste 2 - account.pwd");

    var result3 = ComplexPropertyReader.getValue(myComplexObject, 'account.secret.a');
    t.assert(result3 == 1, "Aplicou ComplexPropertyReader teste 3 - account.secret.a");


    var contextEntities = new Object();
    contextEntities["myComplexObject"] = myComplexObject;
    contextEntities["VariaveisAuxiliares"] = { AuxNumber1 : 0 }

    var teste = 1;
    teste++;
    
    var listOperation1 = new ParameterEntityPropertyList("myComplexObject","account.log",
        ListOperationFactory.Mount(ListOperator.Sum),"time");

    var actionSomarHistorico = new ActionParameterized(
            new ParameterEntityProperty('VariaveisAuxiliares','AuxNumber1'), 
            OperationFactory.Mount(ActionOperator.SetValue), 
            listOperation1);
    
    var rule = new RuleParameterized();
    rule.parameterizedActionsInit.push(actionSomarHistorico);
    rule.Execute(contextEntities);


    //perf test 1
    var start = PerformanceWatcher.getStart();

    var qtdIteracoes = 1000000;
    for(var i = 0; i < qtdIteracoes; i++)  
        var result1 = ComplexPropertyReader.getValue(myComplexObject, 'name');
    
    var elaspedTime = PerformanceWatcher.getElapsed(start);
  
    t.assert(true, "Execucao de " + qtdIteracoes + " de iteracoes em ComplexPropertyReader 1: " + elaspedTime + "s");

    //perf test 2 --6x slower
    var start = PerformanceWatcher.getStart();

    var qtdIteracoes = 1000000;
    for(var i = 0; i < qtdIteracoes; i++)  
        var result1 = ComplexPropertyReader.getValue(myComplexObject, 'account.pwd');
    
    var elaspedTime = PerformanceWatcher.getElapsed(start);
  
    t.assert(true, "Execucao de " + qtdIteracoes + " de iteracoes em ComplexPropertyReader 1: " + elaspedTime + "s");

    //perf test 3 -- 6.6x slower, independent of the string length
    var start = PerformanceWatcher.getStart();

    var qtdIteracoes = 1000000;
    for(var i = 0; i < qtdIteracoes; i++)  
        var result1 = ComplexPropertyReader.getValue(myComplexObject, 'account.secret.adasd');
    
    var elaspedTime = PerformanceWatcher.getElapsed(start);
  
    t.assert(true, "Execucao de " + qtdIteracoes + " de iteracoes em ComplexPropertyReader 1: " + elaspedTime + "s");

    t.end();
});

test('Teste regra encadeada',(t) => {

    var contextEntities = mockBasicContextEntities();
    contextEntities["VariaveisAuxiliares"] = { AuxString1 : '' };

    var chainedRule = mockBasicRule();
        
    var rule = new RuleParameterized();
    rule.parameterizedConditions.push(new ConditionParameterized(
        new ParameterEntityProperty('beneficiario','sexo'),
        ConditionFactory.Mount(ConditionOperator.Equals),
        new ParameterFixedValue('M')
    ));
    rule.parameterizedActionsThen.push(new ActionChainedRule(chainedRule));
    rule.parameterizedActionsThen.push(new ActionParameterized(
        new ParameterEntityProperty('VariaveisAuxiliares','AuxString1'),
        OperationFactory.Mount(ActionOperator.SetValue),
        new ParameterFixedValue('É masculino, executa regra encadeada')
    ))
    rule.parameterizedActionsElse.push(new ActionParameterized(
        new ParameterEntityProperty('VariaveisAuxiliares','AuxString1'),
        OperationFactory.Mount(ActionOperator.SetValue),
        new ParameterFixedValue('Não é masculino, não executa regra encadeada')
    ))
    
    rule.Execute(contextEntities);
    t.assert(contextEntities.autorizacaoItem.autorizaCompra === true, "Aplicou regra basica 1.0 (true) corretamente");
    t.assert(contextEntities['VariaveisAuxiliares']['AuxString1'] === 'É masculino, executa regra encadeada', 
             "Aplicou regra basica 1.1 (str) corretamente");

    contextEntities.beneficiario.idade = 15;
    rule.Execute(contextEntities);
    t.assert(contextEntities.autorizacaoItem.autorizaCompra === false, "Aplicou regra basica 1.2 (false) corretamente");
    t.assert(contextEntities['VariaveisAuxiliares']['AuxString1'] === 'É masculino, executa regra encadeada', 
             "Aplicou regra basica 1.3 (str) corretamente");

    
    var contextEntities = mockBasicContextEntities();
    contextEntities["VariaveisAuxiliares"] = { AuxString1 : '' };

    contextEntities.beneficiario.sexo = 'F';
    contextEntities.beneficiario.idade = 19;
    
    
    rule.Execute(contextEntities);
    t.assert(contextEntities.autorizacaoItem.autorizaCompra === true, "Aplicou regra basica 2.0 (true) corretamente");
    t.assert(contextEntities['VariaveisAuxiliares']['AuxString1'] === 'Não é masculino, não executa regra encadeada', 
             "Aplicou regra basica 2.1 (str) corretamente");
             
    contextEntities.beneficiario.idade = 15;
    rule.Execute(contextEntities);
    t.assert(contextEntities.autorizacaoItem.autorizaCompra === true, "Aplicou regra basica 2.2 (false) corretamente");
    t.assert(contextEntities['VariaveisAuxiliares']['AuxString1'] === 'Não é masculino, não executa regra encadeada', 
             "Aplicou regra basica 2.3 (str) corretamente");

    //perf test 1
    var start = PerformanceWatcher.getStart();

    var qtdIteracoes = 1000000;
    for(var i = 0; i < qtdIteracoes; i++)  
        rule.Execute(contextEntities);
    
    contextEntities['TotalElapsedTimeNS'] = PerformanceWatcher.getElapsed(start);
  
    t.assert(true, 
        "Execucao de " + qtdIteracoes + " de iteracoes em regra encadeada: " + 
        contextEntities['TotalElapsedTimeNS'] + "s");

    t.end();
});