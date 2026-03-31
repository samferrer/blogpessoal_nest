import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './entities/postagem.entity';
import { PostagemService } from './services/postagem.service';
import { PostagemController } from './controllers/postagem.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem])], //Importa  o Posagem como uma entid
  providers: [PostagemService], //Define o PostagemService como um provedor para ser injetado em outros componentes
  controllers: [PostagemController],
  exports: [TypeOrmModule], //Exporta o TypeOrmModule para que outros módulos possam usar as entidades e repositórios definidos aqui
})
export class PostagemModule {}
