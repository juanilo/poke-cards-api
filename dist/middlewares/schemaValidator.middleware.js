"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidation = void 0;
const zod_1 = require("zod");
const schemaValidation = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json(error.issues.map((issue) => ({ field: issue.path.at(0), error: issue.message })));
        }
        return res.status(400).json({ error });
    }
};
exports.schemaValidation = schemaValidation;
