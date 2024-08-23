'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.validateRequestIdParam = exports.validateRequestBody = void 0;
const validateRequestBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Invalid request body' });
  }
  next();
};
exports.validateRequestBody = validateRequestBody;
const validateRequestIdParam = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'Invalid request id param' });
  }
  next();
};
exports.validateRequestIdParam = validateRequestIdParam;
