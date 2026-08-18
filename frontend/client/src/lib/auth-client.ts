import {createAuthClient} from "better-auth/client";
import {adminClient} from "better-auth/client/plugins";
import {ac, admin, doctor, nurse} from "./permissions";

export const authClient = createAuthClient({
    baseURL: 'http://localhost:4000',
    plugins: [
        adminClient({ ac, roles: { admin, doctor, nurse } }
        ),
    ],
})


