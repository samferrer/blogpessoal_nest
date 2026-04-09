import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
 
@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }
 
    async findByUsuario(usuario: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }
 
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
          relations:{
            postagem: true
          }
        });

    }
 
    async findById(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
			relations:{
            	postagem: true
          	}
        });
 
        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);
        return usuario;
    }
 
    async create(usuario: Usuario): Promise<Usuario> {

        const buscaUsuario = await this.findByUsuario(usuario.usuario); //verificar se o usuário já existe, para não cadastrar o mesmo usuário mais de uma vez

        if (buscaUsuario) //se o usuário já existe, lança uma exceção
            throw new HttpException("O Usuario já existe!", HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha) //criptografar a senha antes de salvar no banco de dados, para garantir a segurança da senha do usuário
        return await this.usuarioRepository.save(usuario); //salvar o usuário no banco de dados, o método save é do TypeORM, ele salva o usuário e retorna o usuário salvo, ou seja, com o id gerado pelo banco de dados
 
    }
 
    async update(usuario: Usuario): Promise<Usuario> {
        await this.findById(usuario.id); 
        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario && buscaUsuario.id !== usuario.id) //verificar se o usuário já existe, para não cadastrar o mesmo usuário mais de uma vez, mas permite atualizar o usuário se o id do usuário encontrado for igual ao id do usuário que está sendo atualizado
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
 
    }
 
}
 