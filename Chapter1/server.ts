import { serve } from "https://deno.land/std/http/server.ts";

const s = serve({ port: 3000 });
console.log("Listening on port 3000");

for await (const req of s) {
  req.respond({ body: JSON.stringify({ msg: "Hello world ... from Deno!" }) });
}
