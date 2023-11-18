import { oak, oakCors } from "./deps.ts";
import logger from "./middleware/logger.ts";
import router from "./router/index.ts";

const app = new oak.Application();

// logger
app.use(logger());

// cors
app.use(oakCors());

// router
app.use(router.routes(), router.allowedMethods());

export default app;
