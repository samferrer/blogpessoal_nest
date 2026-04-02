import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Postagem } from './entities/postagem.entity'
import { PostagemService } from './services/postagem.service'
import { PostagemController } from './controllers/postagem.controller'
import { TemaModule } from '../tema.module'

@Module({
  imports: [TypeOrmModule.forFeature([Postagem]), TemaModule], //Importa  o Posagem como uma entid
  providers: [PostagemService], //Define o PostagemService como um provedor para ser injetado em outros componentes
  controllers: [PostagemController], //Define o PostagemController como um controlador para lidar com as rotas relacionadas a postagem
  exports: [TypeOrmModule] //Exporta o TypeOrmModule para que outros módulos possam usar as entidades e repositórios definidos aqui
})
export class PostagemModule {}
