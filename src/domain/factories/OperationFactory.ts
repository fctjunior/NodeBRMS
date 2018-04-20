import OperationType from "../enumerators/OperationType";

class ActionFactory {
    public Mount(type:OperationType): Function {
        switch (type) {
            case OperationType.SetValue:
                return (paramleft, paramRight) => (paramRight);
            case OperationType.Sum:
                return (paramleft, paramRight) => (paramleft + paramRight);
            case OperationType.Subtract:
                return (paramleft, paramRight) => (paramleft - paramRight);
            case OperationType.Power:
                return (paramleft, paramRight) => (paramleft * paramRight);
            case OperationType.Divide:
                return (paramleft, paramRight) => (paramleft / paramRight);
            case OperationType.DiscountPercent:
                return (paramleft, paramRight) => (paramleft - (paramleft * (paramRight / 100)));
            default:
                throw new Error('ActionFactory.Mount: ActionType - Not implemented');
        }
    }
}

export default new ActionFactory();