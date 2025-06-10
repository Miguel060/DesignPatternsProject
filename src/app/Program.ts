import Database from "../database/Database.js";
import dotenv from 'dotenv-flow';
dotenv.config();

const conn = Database.getInstance();

const query = `select pessoa.nmpessoa, pessoa.idpessoa, grupo.idgrupo 
from pessoa inner join grupo on 
pessoa.idgrupo = grupo.idgrupo`;

const result = await conn.query(query);
console.log(result.rows);

