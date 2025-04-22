import {
  registerHandler,
  loginHandler,
} from "../controllers/authController.js";

async function authRoutes(fastify, options) {
  fastify.post("/register", registerHandler);
  fastify.post("/login", loginHandler);

  fastify.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get(
    "/protected",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      return {
        message: "Você acessou uma rota protegida!",
        user: request.user,
      };
    }
  );
}

export default authRoutes;
