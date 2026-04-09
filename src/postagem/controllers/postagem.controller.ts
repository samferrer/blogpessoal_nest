import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Postagem } from '../entities/postagem.entity'
import { PostagemService } from './../services/postagem.service'
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common'

@UseGuards(JwtAuthGuard) //protege todas as rotas do controller, ou seja, para acessar qualquer rota do controller, o usuário precisa estar logado, ou seja, precisa ter um token válido
@Controller('/postagens')
export class PostagemController {
  postagemRepository: any;
  constructor(private readonly PostagemService: PostagemService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Postagem[]> {
    return this.PostagemService.findAll()
  }

  @Get('/:id')
  findById(@Param('id' , ParseIntPipe) id: number){
    return this.PostagemService.findById(id);

  }

  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findByAllTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    return this.PostagemService.findAllByTitulo(titulo);
  }

  @Post()
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.PostagemService.create(postagem);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() postagem: Postagem): Promise<Postagem> {
    return this.PostagemService.update(postagem);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(id:number){
    return this.PostagemService.delete(id);
  }

}
