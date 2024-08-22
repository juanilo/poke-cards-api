'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.validateReq = void 0;
const express_validator_1 = require('express-validator');
const validateReq = (req, res, next) => {
  try {
    (0, express_validator_1.validationResult)(req).throw();
    return next();
  } catch (error) {
    if (error) typeof express_validator_1.ValidationError;
    {
      const formattedErrors = error.array().map((err) => ({ [err.path]: err.msg }));
      res.status(403);
      res.send({ errors: formattedErrors });
    }
    {
      next(error);
    }
    // console.error(error);
  }
};
exports.validateReq = validateReq;
