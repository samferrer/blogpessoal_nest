import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
    //método de criptografar a senha
    async criptografarSenha(senha: string): Promise<string> { //Promise ptomete um retorno, nesse caso vai retornar a senha

        let saltos: number = 10; //quantidade de vezes que a senha vai ser criptografada, quanto mais alto mais seguro, mas demora mais
        return await bcrypt.hash(senha, saltos); //hash é o método de criptografar a senha, recebe a senha e a quantidade de saltos // mexe a senha 10 vezes, ou seja, a senha vai ser criptografada 10 vezes, o resultado final é a senha criptografada
    }

    //comparar as senhas que está sendo digitada com a senha que está no banco de dados, para verificar se a senha digitada é igual a senha do banco de dados
    async compararSenha(senhaDigitada: string, senhabanco: string): Promise<boolean> { //Promise ptomete um retorno, nesse caso vai retornar um booleano
        return await bcrypt.compare(senhaDigitada, senhabanco);
    }

}

