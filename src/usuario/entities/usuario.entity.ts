import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { Postagem } from "../../postagem/entities/postagem.entity"
 
@Entity({name: "tb_usuarios"})

export class Usuario {
 
    @PrimaryGeneratedColumn() 
    id!: number
 
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    nome!: string
 
    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    usuario!: string
 
    @MinLength(8) //a senha deve ter no mínimo 8 caracteres
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    senha!: string
 
    @Column({length: 5000 }) 
    foto!: string // é string pq vai receber links p carregar a foto do usuário
 
    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem!: Postagem[]
 
}
 