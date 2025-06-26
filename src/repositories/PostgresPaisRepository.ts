import { IviagemRepositories } from "./IviagemRepositories.js";
import { Pais } from "../models/Pais.js";
import Database from "../database/Database.js"
import { Viagem } from "../models/Viagem.js";

export class PostgresPaisRepository implements IviagemRepositories {
  private conn = Database.getInstance();

  async listarViagens(nome: string): Promise<Viagem[]> {
    const result = await this.conn.query(
      `SELECT v.idviagem, v.vlviagem, v.idpais,v.qntpessoas, v.dtviagem,
            p.nmpais, p.img
            FROM viagem v
            JOIN pais p ON v.idpais = p.idpais
            WHERE LOWER(p.nmpais) LIKE LOWER($1);`,
      [`%${nome}%`]
    )
    return result.rows;
  }

  async listar(): Promise<Pais[]> {
    const query = `SELECT idpais, nmpais, vlpassagem, img 
        FROM pais`;
    const result = await this.conn.query(query);
    return result.rows;
  }
  async listarHoteisPorPais(idpais: number) {
    const result = await this.conn.query(
      `SELECT idhotel, nmhotel, vlhotel FROM hotel WHERE idpais = $1`,
      [idpais]
    );
    return result.rows;
  }

  async adicionarViagem(data: {
    idpais: number;
    idhotel: number;
    qntpessoas: number;
    vlviagem: number;
    dtviagem: string;
    idgrupo?: number;
    idagencia?: number;
  }): Promise<void> {
    const query = `
    INSERT INTO viagem (idpais, idhotel, qntpessoas, vlviagem, dtviagem, idgrupo, idagencia)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    await this.conn.query(query, [
      data.idpais,
      data.idhotel,
      data.qntpessoas,
      data.vlviagem,
      data.dtviagem,
      data.idgrupo || 0,
      data.idagencia || 1
    ]);
  }
  async removerViagem(idviagem: number): Promise<void> {
    await this.conn.query('DELETE FROM viagem WHERE idviagem = $1', [idviagem]);
  }
}