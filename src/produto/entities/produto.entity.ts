import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";



@Entity({name: "tb_produtos"}) // CREATE TABLE tb_produtos
export class Produto{

    @PrimaryGeneratedColumn() // PRIMARY KEY(id) AUTO INCREMENT
    id: number;

   @Transform(({value} : TransformFnParams) => value?.trim()) // Remover espaços em branco 
   @IsNotEmpty() //Força digitação
   @Column({length: 100, nullable: false})// VARCHAR(100) NOT NULL
    nome: string;

   @IsNotEmpty() //Força digitação
   @Column({length: 255, nullable: false})// VARCHAR(255) NOT NULL
   descricao: string;
   
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    preco: number;

     /*
    //Relacionamento com categoria
    @OneToMany(() => Categoria, (categoria)=> categoria.produto)
    categoria: Categoria[];
    */

}