import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controller/usuario.controller';
import { AuthModule } from '../auth/auth.module';
 
@Module({
  imports: [TypeOrmModule.forFeature([Usuario]),
forwardRef(() => AuthModule) //executa todos os modulos e depois o authmodule, para evitar o erro de dependência circular, ou seja, quando um modulo depende de outro modulo e esse outro modulo depende do primeiro modulo, isso gera um erro de dependência circular, o forwardRef é uma função que recebe uma função que retorna o modulo que tem a dependência circular
], 
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}