import express from "express";
import { corsMiddleware } from "./middleware/cors.middleware";
import { env } from "./config/env";
import routes from "./routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser("mySecretKey"));
app.use("/api", routes);

const PORT = env.PORT;
app.listen(PORT, () => console.log(`🚀 Server ready at: http://localhost:${PORT}`));
