"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const pg_1 = require("pg");
exports.connection = new pg_1.Pool({
    user: 'admin',
    host: 'localhost',
    password: 'admin',
    database: 'pokecards',
    port: 5432,
});
