"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConditionType_1 = require("../enumerators/ConditionType");
class ConditionFactory {
    Mount(type) {
        switch (type) {
            case ConditionType_1.default.Different:
                return (paramleft, paramRight) => (paramleft != paramRight);
            case ConditionType_1.default.Equals:
                return (paramleft, paramRight) => (paramleft == paramRight);
            case ConditionType_1.default.Greater:
                return (paramleft, paramRight) => (paramleft > paramRight);
            case ConditionType_1.default.GreaterOrEquals:
                return (paramleft, paramRight) => (paramleft >= paramRight);
            case ConditionType_1.default.ModulusZero:
                return (paramleft, paramRight) => (paramleft % paramRight == 0);
            case ConditionType_1.default.Smaller:
                return (paramleft, paramRight) => (paramleft < paramRight);
            case ConditionType_1.default.SmallerOrEquals:
                return (paramleft, paramRight) => (paramleft <= paramRight);
            default:
                throw new Error('ConditionFactory.Mount: ConditionType - Not implemented');
        }
    }
}
exports.default = new ConditionFactory();
