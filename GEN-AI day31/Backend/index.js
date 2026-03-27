import "dotenv/config";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { ChatMistralAI } from "@langchain/mistralai";
import { tool } from "@langchain/core/tools";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

import { SendEmail } from "./mail.service.js";
import { z } from "zod";


// ---------------- TOOL ----------------
export const emailTool = tool(
    async ({ to, subject, html }) => {
        return await SendEmail({ to, subject, html });
    },
    {
        name: "emailTool",
        description: "Use this tool to send email",
        schema: z.object({
            to: z.string().describe("Recipient email"),
            subject: z.string().describe("Email subject"),
            html: z.string().describe("Email body"),
        }),
    }
);


// ---------------- READLINE ----------------
const rl = readline.createInterface({ input, output });


// ---------------- MODEL ----------------
const model = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY,
});


// ---------------- AGENT ----------------
const agent = createReactAgent({
    llm: model,
    tools: [emailTool],
});


// ---------------- CHAT LOOP ----------------
while (true) {
    const userInput = await rl.question("\x1b[32m You:\x1b[0m ");

    const response = await agent.invoke({
        messages: [
            new HumanMessage(`
ONLY call emailTool if user clearly says "send email".

Otherwise just reply normally.

User: ${userInput}
`),
        ],
    });

    console.log(`\x1b[34mAI:\x1b[0m ${response.messages.at(-1).content}` );
}






