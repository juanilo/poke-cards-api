"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_json_1 = __importDefault(require("./../swagger.json"));
const errorHandler_middleware_1 = __importDefault(require("./middlewares/errorHandler.middleware"));
const swaggerDocument = (0, swagger_jsdoc_1.default)(swagger_json_1.default);
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use('/api/v1/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/api/v1', index_routes_1.default);
app.use(errorHandler_middleware_1.default);
app.listen(port, () => {
    console.log(`Card API service is running on port ${port}...`);
});
