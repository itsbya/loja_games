import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator/types/decorator/decorators";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";


@Entity({name: "tb_categorias"}) // CREATE TABLE tb_categorias
export class Categoria{

    @PrimaryGeneratedColumn() // PRIMARY KEY(id) AUTO INCREMENT
    id: number;

   @Transform(({value} : TransformFnParams) => value?.trim()) // Remover espaços em branco 
   @IsNotEmpty() //Força digitação
   @Column({length: 100, nullable: false})// VARCHAR(100) NOT NULL
    nome: string;

   @IsNotEmpty() //Força digitação
   @Column({length: 255, nullable: false})// VARCHAR(255) NOT NULL
   descricao: string;

   
    //Relacionamento com categoria
    @OneToMany(() => Produto,(produto)=> produto.categoria)
    produto: Produto[];
   

}