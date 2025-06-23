import Database from "../database/Database.js";
export class PostgresPaisRepository {
    async listar() {
        const conn = Database.getInstance();
        const query = 'SELECT idpais, nmpais, img FROM pais';
        const result = await conn.query(query);
        return result.rows;
    }
}
