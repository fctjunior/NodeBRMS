import ActionOperator from "../enumerators/operators/ActionOperator";

class ActionFactory {
    public Mount(type:ActionOperator): Function {
        switch (type) {
            case ActionOperator.SetValue:
                return (paramleft, paramRight) => (paramRight);
            case ActionOperator.Sum:
                return (paramleft, paramRight) => (paramleft + paramRight);
            case ActionOperator.Subtract:
                return (paramleft, paramRight) => (paramleft - paramRight);
            case ActionOperator.Power:
                return (paramleft, paramRight) => (paramleft * paramRight);
            case ActionOperator.Divide:
                return (paramleft, paramRight) => (paramleft / paramRight);
            case ActionOperator.DiscountPercent:
                return (paramleft, paramRight) => (paramleft - (paramleft * (paramRight / 100)));
            default:
                throw new Error('ActionFactory.Mount: ActionOperator - Not implemented');
        }
    }
}

export default new ActionFactory();