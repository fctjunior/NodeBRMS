import ConditionType from "../enumerators/ConditionType";

class ConditionFactory {
    public Mount(type:ConditionType): Function {

        switch (type) {
            case ConditionType.Different:
                return (paramleft, paramRight) => (paramleft != paramRight);
            case ConditionType.Equals:
                return (paramleft, paramRight) => (paramleft == paramRight);
            case ConditionType.Greater:
                return (paramleft, paramRight) => (paramleft > paramRight);
            case ConditionType.GreaterOrEquals:
                return (paramleft, paramRight) => (paramleft >= paramRight);
            case ConditionType.ModulusZero:
                return (paramleft, paramRight) => (paramleft % paramRight == 0);
            case ConditionType.Smaller:
                return (paramleft, paramRight) => (paramleft < paramRight);
            case ConditionType.SmallerOrEquals:
                return (paramleft, paramRight) => (paramleft <= paramRight);
            default:
                throw new Error('ConditionFactory.Mount: ConditionType - Not implemented');
        }
    }
}

export default new ConditionFactory();