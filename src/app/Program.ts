import Database from "../database/Database.js";
import dotenv from 'dotenv';
import cors from "cors";
import express, {Request, Response} from "express"
import { PostgresPaisRepository } from "../repositories/PostgresPaisRepository.js";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json())

