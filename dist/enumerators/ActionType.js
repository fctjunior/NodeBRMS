"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionType;
(function (ActionType) {
    ActionType[ActionType["SetValue"] = 0] = "SetValue";
    ActionType[ActionType["Sum"] = 1] = "Sum";
    ActionType[ActionType["Subtract"] = 2] = "Subtract";
    ActionType[ActionType["Power"] = 3] = "Power";
    ActionType[ActionType["Divide"] = 4] = "Divide";
    ActionType[ActionType["SubRule"] = 5] = "SubRule";
    ActionType[ActionType["DiscountPercent"] = 6] = "DiscountPercent";
})(ActionType || (ActionType = {}));
exports.default = ActionType;
