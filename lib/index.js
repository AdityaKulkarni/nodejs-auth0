"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
require('dotenv').config();
const jwtCheck = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    tokenSigningAlg: process.env.TOKEN_SIGNING_ALG,
});
const app = (0, express_1.default)();
app.use(jwtCheck);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World from unsecured endpoint!');
});
app.get('/secured', jwtCheck, (req, res) => {
    res.send('Hello World from secured endpoint!');
});
app.listen(3100, () => {
    console.log('Server is listening on port 3100');
});
