import ListOperator from "../enumerators/operators/ListOperator";
import ICondition from "../entities/Conditions/ICondition";
import ComplexPropertyReader from "../../infrastructure-cross-utils/ComplexPropertyReader";

class ListOperationFactory {
    public Mount(type:ListOperator): Function {

        switch (type) {
            case ListOperator.Count:
                return ListOperationCount;
            case ListOperator.Sum:
                return ListOperationSum;
            default:
                throw new Error('ListOperationFactory.Mount: ListOperator - Not implemented');
        }
    }
}

function ListOperationCount(
    contextEntities:any, 
    entity:string, 
    property:string,     
    aggregateBy:string,
    conditions:Array<ICondition>) 
{
    var list = ComplexPropertyReader.getValue(contextEntities[entity], property) as Array<any>;
    var count = 0;

    if (conditions != null && conditions.length > 0) 
    {
        for (let i = 0; i < list.length; i++) 
        {           
            var itemAccepted = true; 
            contextEntities["$currentListItem"] = list[i];
            
            for (let j = 0; j < conditions.length; j++) 
            {
                itemAccepted = conditions[j].Evaluate(contextEntities);
                if (!itemAccepted)
                    break;
            }

            if (itemAccepted)
                count++;
        }
    } 
    else 
    {
        count = list.length;
    }

    delete contextEntities.$currentListItem;

    return count;
}

function ListOperationSum(
    contextEntities:any, 
    entity:string, 
    property:string,     
    aggregateBy:string,
    conditions:Array<ICondition>) 
{
    var list = ComplexPropertyReader.getValue(contextEntities[entity], property) as Array<any>;
    var sum = 0;

    for (let i = 0; i < list.length; i++) 
    {           
        var itemAccepted = true; 
        contextEntities["$currentListItem"] = list[i];
        
        for (let j = 0; j < conditions.length; j++) 
        {
            itemAccepted = conditions[j].Evaluate(contextEntities);
            if (!itemAccepted)
                break;
        }

        if (itemAccepted)
            sum = sum + ComplexPropertyReader.getValue(contextEntities["$currentListItem"],aggregateBy);
    }

    delete contextEntities.$currentListItem;

    return sum;
}

export default new ListOperationFactory();