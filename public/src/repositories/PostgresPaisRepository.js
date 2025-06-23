import Database from "../database/Database.js";
export class PostgresPaisRepository {
    constructor() {
        this.conn = Database.getInstance();
    }
    async listarViagens(nome) {
        const result = await this.conn.query(`SELECT v.vlviagem, v.idpais, v.dtviagem,
            p.nmpais, p.img
            FROM viagem v
            JOIN pais p ON v.idpais = p.idpais
            WHERE LOWER(p.nmpais) LIKE LOWER($1);`, [`%${nome}%`]);
        return result.rows;
    }
    async listar() {
        const query = `SELECT idpais, nmpais, img 
        FROM pais`;
        const result = await this.conn.query(query);
        return result.rows;
    }
}
