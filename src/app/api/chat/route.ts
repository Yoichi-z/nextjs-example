import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
import { RemoteRunnable } from "@langchain/core/runnables/remote";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// Set the runtime to edge for best performance
export const runtime = 'edge';
 

export async function POST(req: Request) {
  const { messages } = await req.json();
 
  // // Ask OpenAI for a streaming chat completion given the prompt
  // const response = await openai.chat.completions.create({
  //   model: 'gpt-4',
  //   stream: true,
  //   messages,
  // });

  const remoteChain = new RemoteRunnable({
    url: "http://localhost:8000/openai",
  });
  const stream = await remoteChain.stream(messages);
  //console.log(stream)

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  let first_entry_skipped = false;
  const transformStream = new TransformStream({
    transform(chunk, controller) {  
      if  (!first_entry_skipped) {
          first_entry_skipped = true;
      }
      else {
        controller.enqueue(chunk.content);
      }
    },
  });

  return new StreamingTextResponse(stream.pipeThrough(transformStream));

  // Convert the response into a friendly text-stream
  //const stream = OpenAIStream(response);
  // Respond with the stream
  //return new StreamingTextResponse(stream);
}