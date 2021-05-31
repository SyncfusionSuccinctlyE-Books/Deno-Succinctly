// server.ts

import { Application } from "./deps.ts";
import { router } from "./routes.ts";
import notFound from "./middleware/notFound.ts";
import logging from "./middleware/logging.ts";

const app = new Application();
app.use(logging.logger);
app.use(logging.responseTime);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFound);

app.listen({ port: 3000 });
console.log("Server is running....");
