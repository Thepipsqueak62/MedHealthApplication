"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.nurse = exports.doctor = exports.ac = void 0;
// permissions.ts
var access_1 = require("better-auth/plugins/access");
var access_2 = require("better-auth/plugins/admin/access");
var statement = __assign(__assign({}, access_2.defaultStatements), { patientRecord: ["create", "read", "update", "delete"] });
exports.ac = (0, access_1.createAccessControl)(statement);
exports.doctor = exports.ac.newRole({
    patientRecord: ["create", "read", "update"],
});
exports.nurse = exports.ac.newRole({
    patientRecord: ["read", "update"],
});
exports.admin = exports.ac.newRole(__assign(__assign({}, access_2.adminAc.statements), { patientRecord: ["create", "read", "update", "delete"] }));
