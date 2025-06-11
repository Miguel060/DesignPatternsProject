import { Pais } from "../models/Pais.js";

export interface IpaisRepository {
    listar(): Promise<Pais[]>;
}