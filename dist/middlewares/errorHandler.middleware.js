"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandlerMiddleware = (err, _req, res) => {
    var _a;
    console.error(err);
    res.status(500).json({ message: (_a = err.message) !== null && _a !== void 0 ? _a : 'Internal server error' });
};
exports.default = errorHandlerMiddleware;
