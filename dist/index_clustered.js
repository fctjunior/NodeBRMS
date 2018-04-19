"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const cluster = require("cluster");
const os = require("os");
const port = process.env.PORT || 1337;
if (cluster.isMaster) {
    var numCPUs = os.cpus().length;
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
}
else {
    app_1.default.listen(port, (err) => {
        if (err)
            return console.log(err);
        return console.log(`server is listening on ${port}`);
    });
}
//# sourceMappingURL=index_clustered.js.map