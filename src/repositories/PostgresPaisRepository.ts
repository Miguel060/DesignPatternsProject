import { IpaisRepository } from "./IpaisRepository.js";
import { Pais } from "../models/Pais.js";
import Database from "../database/Database.js"

export class PostgresPaisRepository implements IpaisRepository{
   async listar(): Promise<Pais[]> {
       const conn = Database.getInstance();
       const query = 'SELECT idpais, nmpais, img FROM pais';
       const result = await conn.query(query);
       return result.rows;
   }
}