'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.specs = void 0;
const swagger_jsdoc_1 = __importDefault(require('swagger-jsdoc'));
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger Express API',
      version: '1.0.0',
      description: 'A simple Express API with Swagger documentation',
    },
  },
  apis: ['./routes/*.ts'], // Path to your API routes
};
exports.specs = (0, swagger_jsdoc_1.default)(options);
