import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({name: "tb_postagem"}) //Cria uma tabela chamada tb_postagem
export class Postagem{

  @PrimaryGeneratedColumn() //Cria uma chave primária e auto increment  
  id!: number;

  @IsNotEmpty()
  @Column({length: 100, nullable: false}) //Cria uma coluna do tipo string, com tamanho máximo de 100 caracteres e não permite valores nulos
  titulo!: string;

  @IsNotEmpty()
  @Column({length: 1000, nullable: false}) //Cria uma coluna do tipo string, com tamanho máximo de 500 caracteres e não permite valores nulos
  texto!: string;

  @UpdateDateColumn() //Cria uma coluna do tipo data, que é atualizada automaticamente toda vez que a entidade é atualizada
  data!: Date;

  @ManyToOne(() => Tema, (tema) => tema.postagem, { //muitas postagens para um tema
    onDelete: "CASCADE" //Cria um relacionamento muitos para um com a entidade Tema, onde uma postagem pode ter apenas um tema, mas um tema pode ter várias postagens. O parâmetro eager: true indica que o tema relacionado deve ser carregado automaticamente quando a postagem for carregada.
  })
  tema!: Tema

  @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
    onDelete: "CASCADE"
  })
  usuario!: Usuario

}