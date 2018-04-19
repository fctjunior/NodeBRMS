import * as test from 'tape';
import Rule from '../domain/entities/Rule';
import ParameterizedCondition from '../domain/entities/ParameterizedCondition';
import ParameterEntityProperty from '../domain/entities/ParameterEntityProperty';
import ParameterFixedValue from '../domain/entities/ParameterFixedValue';
import ParameterizedAction from '../domain/entities/ParameterizedAction';
import PerformanceWatcher from '../infrastructure-cross-utils/PerformanceWatcher';
import ConditionFactory from '../domain/factories/ConditionFactory';
import ConditionType from '../domain/enumerators/ConditionType';
import ActionFactory from '../domain/factories/ActionFactory';
import ActionType from '../domain/enumerators/ActionType';
import ParameterEntityPropertyList from '../domain/entities/ParameterEntityPropertyList';
import ListOperationFactory from '../domain/factories/ListOperationFactory';
import ListOperationType from '../domain/enumerators/ListOperationType';
import ComplexPropertyReader from '../infrastructure-cross-utils/ComplexPropertyReader';

var mockBasicContextEntities = function() {
    var contextEntities =  {
		"beneficiario" : {
			"nome" : "Tarcisio",
			"sexo" : "M",
			"idade" : 22
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

var mockBasicRule = function(): Rule {
    var rule = new Rule();
    rule.parameterizedConditions.push(
        new ParameterizedCondition(
        new ParameterEntityProperty('beneficiario','idade'),
        ConditionFactory.Mount(ConditionType.GreaterOrEquals), 
        new ParameterFixedValue(18), 
        true)
    );
    rule.parameterizedActionsElse.push(
        new ParameterizedAction(
        new ParameterEntityProperty('autorizacaoItem','autorizaCompra'), 
        ActionFactory.Mount(ActionType.SetValue), 
        new ParameterFixedValue(false)
        )
    );

    return rule;
}

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
        ListOperationFactory.Mount(ListOperationType.Sum),"QuantidadeVendida");
    listOperation1.conditions = [
        new ParameterizedCondition( new ParameterEntityProperty("$currentListItem","Data"), 
            ConditionFactory.Mount(ConditionType.GreaterOrEquals), new ParameterFixedValue(new Date(2018,4,1)), true),
        new ParameterizedCondition( new ParameterEntityProperty("$currentListItem","LinhaId"), 
            ConditionFactory.Mount(ConditionType.Equals), new ParameterFixedValue(10), true)
    ];

    var actionSomarHistorico = new ParameterizedAction(
            new ParameterEntityProperty('VariaveisAuxiliares','AuxNumber1'), 
            ActionFactory.Mount(ActionType.SetValue), 
            listOperation1);
    
    var listOperation2 = new ParameterEntityPropertyList("Autorizacao","Items",
        ListOperationFactory.Mount(ListOperationType.Sum),"QuantidadeDigitada");
    listOperation2.conditions = [
        new ParameterizedCondition( new ParameterEntityProperty("$currentListItem","LinhaId"), 
            ConditionFactory.Mount(ConditionType.Equals), new ParameterFixedValue(10), true)
    ];

    var actionSomarItensAutorizacao = new ParameterizedAction(
            new ParameterEntityProperty('VariaveisAuxiliares','AuxNumber1'), 
            ActionFactory.Mount(ActionType.Sum), 
            listOperation2
    );

    var rule = new Rule();

    rule.parameterizedActionsInit.push(actionSomarHistorico);
    rule.parameterizedActionsInit.push(actionSomarItensAutorizacao);
    rule.parameterizedConditions.push(
        new ParameterizedCondition(
        new ParameterEntityProperty('VariaveisAuxiliares','AuxNumber1'),
        ConditionFactory.Mount(ConditionType.GreaterOrEquals), 
        new ParameterFixedValue(8), 
        true)
    );
    rule.parameterizedActionsThen.push(
        new ParameterizedAction(
        new ParameterEntityProperty('autorizacaoItem','autorizaCompra'), 
        ActionFactory.Mount(ActionType.SetValue), 
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
    
    var listOperation1 = new ParameterEntityPropertyList("myComplexObject","account.log",
        ListOperationFactory.Mount(ListOperationType.Sum),"time");

    var actionSomarHistorico = new ParameterizedAction(
            new ParameterEntityProperty('VariaveisAuxiliares','AuxNumber1'), 
            ActionFactory.Mount(ActionType.SetValue), 
            listOperation1);
    
    var rule = new Rule();
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