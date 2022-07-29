import initializeFirebase from "../firebase/admin";
import { config } from "dotenv";
import { commandsDeploy } from "./commands-deploy";
import { startBot } from "./server";

config();

initializeFirebase();
commandsDeploy();
startBot();
