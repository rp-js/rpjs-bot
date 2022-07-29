import { config } from "dotenv";
import { commandsDeploy } from "./commands-deploy";
import initializeFirebase from "./firebase/admin";
import { startBot } from "./server";

config();

initializeFirebase();
commandsDeploy();
startBot();
