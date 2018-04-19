"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NS_PER_SEC = 1e9;
class PerformanceWatcher {
    getStart() {
        return process.hrtime();
    }
    getElapsed(startHrTime) {
        var elapsedHr = process.hrtime(startHrTime);
        return (elapsedHr[0] * NS_PER_SEC + elapsedHr[1]) / 1000000000;
    }
}
exports.default = new PerformanceWatcher();
