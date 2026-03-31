import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}
