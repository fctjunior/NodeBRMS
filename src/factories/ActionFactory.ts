import ActionType from "../enumerators/ActionType";

class ActionFactory {
    public Mount(type:ActionType): Function {
        switch (type) {
            case ActionType.SetValue:
                return (paramleft, paramRight) => (paramRight);
            case ActionType.Sum:
                return (paramleft, paramRight) => (paramleft + paramRight);
            case ActionType.Subtract:
                return (paramleft, paramRight) => (paramleft - paramRight);
            case ActionType.Power:
                return (paramleft, paramRight) => (paramleft * paramRight);
            case ActionType.Divide:
                return (paramleft, paramRight) => (paramleft / paramRight);
            case ActionType.DiscountPercent:
                return (paramleft, paramRight) => (paramleft - (paramleft * (paramRight / 100)));
            default:
                throw new Error('ActionFactory.Mount: ActionType - Not implemented');
        }
    }
}

export default new ActionFactory();