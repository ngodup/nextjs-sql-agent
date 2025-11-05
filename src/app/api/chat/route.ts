import { db } from "@/db/db";
import { openai } from "@ai-sdk/openai"; //Adaptor
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  stepCountIs,
} from "ai";
import z from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const SYSTEM_PROMPT = `You are an expert SQL assistant that helps users to query their database using natural language.
   ${new Date().toLocaleString("sv-SE")}
You have access to following tools:
1. db tool - call this tool to query the database.
2. schema tool - call this tool to get database schema information  which will help you to write sql query.

Rules:
1. Generate ONLY SELECT queries (no INSERT, UPDATE, DELETE, DROP)
2. Always use the schema provided by the schema tool
3. Pass in valid SQL syntax in db tool.
4. Pass in valid SQL syntax in schema tool.
5. Important: To query database call db tool. Don't just return SQL query.

Always respond in a helpful, conversational tone while being technically accurate.`;

  const result = streamText({
    model: openai("gpt-4o"),
    messages: convertToModelMessages(messages),
    system: SYSTEM_PROMPT,
    stopWhen: stepCountIs(5),

    tools: {
      schema: tool({
        description: "To get get database schema information",
        inputSchema: z.object({}), // To just give schema to llm no need of input
        execute: async () => {
          return `CREATE TABLE products (id integer PRIMARY KEY AUTOINCREMENT NOT NULL,name text NOT NULL, category text NOT NULL, price real NOT NULL, stock integer DEFAULT 0 NOT NULL, created_at text DEFAULT CURRENT_TIMESTAMP);
          CREATE TABLE sales (id integer PRIMARY KEY AUTOINCREMENT NOT NULL,product_id: integer NOT NULL,quantity: integer NOT NULL,total_amount real NOT NULL,sale_date text DEFAULT CURRENT_TIMESTAMP,customer_name text NOT NULL,region text NOT NULL,FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE no action ON DELETE no action);
        `;
        },
      }),
      // Add your tools here first parameter is metadata, as input for the tool calling is provided by llm, in our case it is query
      db: tool({
        description: "Call this tool to query a database",
        inputSchema: z.object({
          query: z.string().describe("The SQL query to be execute"),
        }), // where execute will be called by llm, where query will be provided by llm based on user input prmompt
        execute: async ({ query }) => {
          //Case 2 with input from llm
          console.log(query);
          //To call database query to turso based on query we got from llm
          // Important carefully on query, we need to santize or validate somehow check for sql injection is Guardrails
          return await db.run(query); // where return will sent back to llm
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
