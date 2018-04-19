const NS_PER_SEC = 1e9;

class PerformanceWatcher {

    public getStart() : [number,number] {
        return process.hrtime();
    }

    public getElapsed(startHrTime:[number,number]) : number {
        var elapsedHr =  process.hrtime(startHrTime);
            return (elapsedHr[0] * NS_PER_SEC + elapsedHr[1])/1000000000;
    }
}

export default new PerformanceWatcher();