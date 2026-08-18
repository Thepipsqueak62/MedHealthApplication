"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var better_auth_1 = require("better-auth");
var better_sqlite3_1 = require("better-sqlite3");
var plugins_1 = require("better-auth/plugins"); // ← the plugin, aliased
var permissions_1 = require("./permissions"); // ← your custom "admin" role
exports.auth = (0, better_auth_1.betterAuth)({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:4000",
    trustedOrigins: ["http://localhost:5173"],
    database: new better_sqlite3_1.default("../sqlite.db"),
    emailAndPassword: { enabled: true },
    plugins: [
        (0, plugins_1.admin)({ ac: permissions_1.ac, roles: { admin: permissions_1.admin, doctor: permissions_1.doctor, nurse: permissions_1.nurse } }),
    ],
});
