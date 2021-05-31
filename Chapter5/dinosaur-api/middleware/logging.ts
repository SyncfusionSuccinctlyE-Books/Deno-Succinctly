// logging.ts

import { bgBlue, bgGreen, bgRed, cyan, green, white } from "../deps.ts";

const X_RESPONSE_TIME: string = "X-Response-Time";

export default {
  logger: async (
    { response, request }: { response: any; request: any },
    next: Function,
  ) => {
    await next();
    const responseTime = response.headers.get(X_RESPONSE_TIME);
    let statusText = "";

    if (response.status == 200 || response.status == 201) {
      statusText = `${bgGreen(white(String(response.status)))}`;
    } else {
      statusText = `${bgRed(white(String(response.status)))}`;
    }

    console.log(
      `${statusText} | ${green(request.method)} ${
        cyan(request.url.pathname)
      } -- ${bgBlue(white(String(responseTime)))}`,
    );
  },
  responseTime: async (
    { response }: { response: any },
    next: Function,
  ) => {
    const start = Date.now();
    await next();
    const msec: number = Date.now() - start;
    response.headers.set(X_RESPONSE_TIME, `${msec}ms`);
  },
};
