"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConditionType;
(function (ConditionType) {
    ConditionType[ConditionType["Equals"] = 0] = "Equals";
    ConditionType[ConditionType["Different"] = 1] = "Different";
    ConditionType[ConditionType["Greater"] = 2] = "Greater";
    ConditionType[ConditionType["GreaterOrEquals"] = 3] = "GreaterOrEquals";
    ConditionType[ConditionType["Smaller"] = 4] = "Smaller";
    ConditionType[ConditionType["SmallerOrEquals"] = 5] = "SmallerOrEquals";
    ConditionType[ConditionType["ModulusZero"] = 6] = "ModulusZero";
})(ConditionType || (ConditionType = {}));
exports.default = ConditionType;
