import { promises } from "dns";
import { Pais } from "../models/Pais.js";
import { Viagem } from "../models/Viagem.js";

export interface IviagemRepositories {
    listar(): Promise<Pais[]>;
    listarViagens(nome: string): Promise<Viagem[]>;
}