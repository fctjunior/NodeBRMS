import ConditionOperator from "../enumerators/operators/ConditionOperator";

class ConditionFactory {
    public Mount(type:ConditionOperator): Function {

        switch (type) {
            case ConditionOperator.Different:
                return (paramleft, paramRight) => (paramleft != paramRight);
            case ConditionOperator.Equals:
                return (paramleft, paramRight) => (paramleft == paramRight);
            case ConditionOperator.Greater:
                return (paramleft, paramRight) => (paramleft > paramRight);
            case ConditionOperator.GreaterOrEquals:
                return (paramleft, paramRight) => (paramleft >= paramRight);
            case ConditionOperator.ModulusZero:
                return (paramleft, paramRight) => (paramleft % paramRight == 0);
            case ConditionOperator.Smaller:
                return (paramleft, paramRight) => (paramleft < paramRight);
            case ConditionOperator.SmallerOrEquals:
                return (paramleft, paramRight) => (paramleft <= paramRight);
            default:
                throw new Error('ConditionFactory.Mount: ConditionOperator - Not implemented');
        }
    }
}

export default new ConditionFactory();