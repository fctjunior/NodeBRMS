"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
const port = process.env.PORT || 1337;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes_1.default.mountRoutes(express.Router()));
app.listen(port, (err) => {
    if (err)
        return console.log(err);
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map