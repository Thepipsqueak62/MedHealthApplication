// permissions.ts
import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
    ...defaultStatements,
    patientRecord: ["create", "read", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const doctor = ac.newRole({
    patientRecord: ["create", "read", "update"],
});

export const nurse = ac.newRole({
    patientRecord: ["read", "update"],
});

export const admin = ac.newRole({
    ...adminAc.statements,
    patientRecord: ["create", "read", "update", "delete"],
});