import Fastify from "fastify";
import fastifyJWT from "fastify-jwt";
import authRoutes from "./routes/authRoutes.js";

const fastify = Fastify();

fastify.register(fastifyJWT, {
  secret: "secret",
});

fastify.register(authRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Servidor rodando na porta 3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
