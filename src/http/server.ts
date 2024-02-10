import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from "zod";

const app = fastify();
const prisma = new PrismaClient();

app.post("/polls", async (request, reply) => {
  const createPollBody = z.object({
    title: z.string(),
  });
  console.log("oi");

  const { title } = createPollBody.parse(request.body);
  try {
    const poll = await prisma.poll.create({
      data: {
        tittle: title,
      },
    });

    return reply.status(201).send({ pollId: poll.id });
  } catch (err) {
    console.log(err);
    return err;
  }
});

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server runnig...");
});
