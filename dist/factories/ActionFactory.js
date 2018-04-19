"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionType_1 = require("../enumerators/ActionType");
class ActionFactory {
    Mount(type) {
        switch (type) {
            case ActionType_1.default.SetValue:
                return (paramleft, paramRight) => (paramRight);
            case ActionType_1.default.Sum:
                return (paramleft, paramRight) => (paramleft + paramRight);
            case ActionType_1.default.Subtract:
                return (paramleft, paramRight) => (paramleft - paramRight);
            case ActionType_1.default.Power:
                return (paramleft, paramRight) => (paramleft * paramRight);
            case ActionType_1.default.Divide:
                return (paramleft, paramRight) => (paramleft / paramRight);
            case ActionType_1.default.DiscountPercent:
                return (paramleft, paramRight) => (paramleft - (paramleft * (paramRight / 100)));
            default:
                throw new Error('ActionFactory.Mount: ActionType - Not implemented');
        }
    }
}
exports.default = new ActionFactory();
