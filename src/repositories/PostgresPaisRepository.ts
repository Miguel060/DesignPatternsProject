import { IviagemRepositories } from "./IviagemRepositories.js";
import { Pais } from "../models/Pais.js";
import Database from "../database/Database.js"
import { Viagem } from "../models/Viagem.js";

export class PostgresPaisRepository implements IviagemRepositories {
    private conn = Database.getInstance();

    async listarViagens(nome: string): Promise<Viagem[]> {
        const result = await this.conn.query(
            `SELECT v.vlviagem, v.idpais, v.dtviagem,
            p.nmpais, p.img
            FROM viagem v
            JOIN pais p ON v.idpais = p.idpais
            WHERE LOWER(p.nmpais) LIKE LOWER($1);`,
            [`%${nome}%`]
        )
        return result.rows;
    }

    async listar(): Promise<Pais[]> {
        const query = `SELECT idpais, nmpais, img 
        FROM pais`;
        const result = await this.conn.query(query);
        return result.rows;
    }
    async adicionarViagem(data: {
    pais: string;
    hotel: string;
    pessoas: number;
    dtviagem: string;
  }): Promise<void> {
    const { pais, hotel, pessoas, dtviagem } = data;

    const paisResult = await this.conn.query(
      `SELECT idpais FROM pais WHERE LOWER(nmpais) = LOWER($1)`,
      [pais]
    );

    if (paisResult.rowCount === 0) {
      throw new Error("País não encontrado");
    }

    const idpais = paisResult.rows[0].idpais;

    await this.conn.query(
      `INSERT INTO viagem (idpais, hotel, vlviagem, dtviagem)
       VALUES ($1, $2, $3, $4)`,
      [idpais, hotel, pessoas, dtviagem]
    );
  }
}