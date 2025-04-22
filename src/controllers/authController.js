import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";

export async function registerHandler(request, reply) {
  const { email, password } = request.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return reply.status(400).send({ message: "Email já cadastrado" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return reply.status(201).send({ message: "Usuário registrado com sucesso!" });
}

export async function loginHandler(request, reply) {
  const { email, password } = request.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return reply.status(400).send({ message: "Email ou senha incorretos" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return reply.status(400).send({ message: "Email ou senha incorretos" });
  }

  const token = await reply.jwtSign({ id: user.id, email: user.email });

  return reply.send({ token });
}
