import Fastify, {FastifyReply, FastifyRequest} from "fastify";
import { fromNodeHeaders } from "better-auth/node";
import fastifyCors from "@fastify/cors";
import {auth} from "./lib/auth";
import Database from "better-sqlite3";
const fastify = Fastify({ logger: true });
const db = new Database("./sqlite.db");
// register user as a real property on every request, defaulting to null
fastify.decorateRequest("user", null);

declare module "fastify" {
    interface FastifyRequest {
        user: {
            id: string;
            email: string;
            role?: string | null;
            [key: string]: unknown;
        } | null;
    }
}

fastify.register(fastifyCors, {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With"
    ],
    credentials: true,
    maxAge: 86400
});

// Register authentication endpoint
fastify.route({
    method: ["GET", "POST"],
    url: "/api/auth/*",
    async handler(request, reply) {
        try {
            const url = new URL(request.url, `http://${request.headers.host}`);
            const headers = fromNodeHeaders(request.headers);
            const req = new Request(url.toString(), {
                method: request.method,
                headers,
                ...(request.body ? { body: JSON.stringify(request.body) } : {}),
            });
            const response = await auth.handler(req);
            reply.status(response.status);
            response.headers.forEach((value, key) => reply.header(key, value));
            return reply.send(response.body ? await response.text() : null);
        } catch (error) {
            fastify.log.error({error},"Authentication Error!");
            return reply.status(500).send({
                error: "Internal authentication error",
                code: "AUTH_FAILURE"
            });
        }
    }
});

function requireRole(allowedRoles: string[]) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const session = await auth.api.getSession({ headers: fromNodeHeaders(request.headers) });
        if (!session) {
            return reply.status(401).send({ error: "Unauthorized" });
        }
        const role = session.user.role ?? "user";
        if (!allowedRoles.includes(role)) {
            return reply.status(403).send({ error: "Forbidden" });
        }
        request.user = session.user;
    };
}

fastify.get("/api/patients", { preHandler: requireRole(["doctor", "nurse", "admin"]) }, async (request, reply) => {
   const patients = db.prepare("SELECT id,name,dob FROM patients").all();
   return {patients}
});

fastify.get("/api/me", async (request, reply) => {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(request.headers),
    });
    if(!session){
        return reply.status(401).send({error:"Unauthorized"});
    }
    return reply.send(session);
})

fastify.listen({ port: 4000 }, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log("Server running on port 4000");
});