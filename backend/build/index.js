"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("./config/constants");
const routes_1 = __importDefault(require("./routes"));
const passportConfig_1 = __importDefault(require("./util/passportConfig"));
const app = (0, express_1.default)();
if (constants_1.env === "production") {
    app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../frontend/build")));
}
else {
    app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../frontend/build")));
}
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: constants_1.session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours in milliseconds
    },
})); // Configure session middleware
app.use(passport_1.default.initialize()); //iniitlaise passport
app.use(passport_1.default.session()); //initalise sessions for cookie mgmt
(0, passportConfig_1.default)(); //passport config
app.use("/auth", routes_1.default); //routes
if (constants_1.env === "production") {
    app.use("/", (_, res) => res.sendFile(path_1.default.resolve(__dirname, "../../frontend/build", "index.html")));
}
else {
    app.use("/", (_, res) => res.sendFile(path_1.default.resolve(__dirname, "../../frontend/build", "index.html")));
}
app.listen(constants_1.port, () => {
    console.log("Server listening on port " + constants_1.port);
});
