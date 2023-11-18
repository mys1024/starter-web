import app from "./app.ts";
import output from "./utils/output.ts";

const port = 80;

app.listen({ port });
output.info(`Serving HTTP on port ${port}...`);
