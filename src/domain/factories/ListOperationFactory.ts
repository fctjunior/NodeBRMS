import ConditionType from "../enumerators/ConditionType";
import ListOperationType from "../enumerators/ListOperationType";
import ParameterizedCondition from "../entities/ParameterizedCondition/ParameterizedCondition";
import ComplexPropertyReader from "../../infrastructure-cross-utils/ComplexPropertyReader";

class ListOperationFactory {
    public Mount(type:ListOperationType): Function {

        switch (type) {
            case ListOperationType.Count:
                return ListOperationCount;
            case ListOperationType.Sum:
                return ListOperationSum;
            default:
                throw new Error('ListOperationFactory.Mount: ListOperationType - Not implemented');
        }
    }
}

function ListOperationCount(
    contextEntities:any, 
    entity:string, 
    property:string,     
    aggregateBy:string,
    conditions:Array<ParameterizedCondition>) 
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
    conditions:Array<ParameterizedCondition>) 
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