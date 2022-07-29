import { config } from "dotenv";
import { commandsDeploy } from "./commands-deploy";
import { startBot } from "./server";

config();

commandsDeploy();
startBot();
