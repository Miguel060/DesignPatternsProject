import { Pool } from "pg";
export default class Database {
    constructor() {
        this.pool = new Pool({
            user: "postgres",
            host: "localhost",
            database: "trabalhoFinalPoo2",
            password: "1710",
            port: Number(5432)
        });
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    query(text, params) {
        return this.pool.query(text, params);
    }
    close() {
        return this.pool.end();
    }
}
