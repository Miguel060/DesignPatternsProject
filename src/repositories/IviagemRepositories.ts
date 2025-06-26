import { promises } from "dns";
import { Pais } from "../models/Pais.js";
import { Viagem } from "../models/Viagem.js";

export interface IviagemRepositories {
  listar(): Promise<Pais[]>;
  listarViagens(nome: string): Promise<Viagem[]>;
  listarHoteisPorPais(idpais: number): Promise<{ idhotel: number, nmhotel: string, vlhotel: number }[]>;
  adicionarViagem(data: {
    idpais: number;
    idhotel: number;
    qntpessoas: number;
    vlviagem: number;
    dtviagem: string;
    idgrupo?: number;
  }): Promise<void>;
  removerViagem(idviagem: number):Promise<void>;
}