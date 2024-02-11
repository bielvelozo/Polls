import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import z from "zod";
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { votePoll } from "./routes/vote-on-poll";
import cookie from "@fastify/cookie";

const app = fastify();

app.register(cookie, {
  secret: "polls-app",
  hook: "onRequest",
});
app.register(createPoll);
app.register(getPoll);
app.register(votePoll);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running! 🚀");
});
