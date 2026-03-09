import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { NumericTransformer } from "../../../util/numericTransformer";



@Entity({name: "tb_produtos"}) // CREATE TABLE tb_produtos
export class Produto{

    @PrimaryGeneratedColumn() // PRIMARY KEY(id) AUTO INCREMENT
    id: number;

   @Transform(({value} : TransformFnParams) => value?.trim()) 
   @IsNotEmpty() //Força digitação
   @Column({length: 100, nullable: false})// VARCHAR(100) NOT NULL
    nome: string;

   @IsNotEmpty() //Força digitação
   @Column({length: 255, nullable: false})// VARCHAR(255) NOT NULL
   descricao: string;
   
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @IsPositive()
    @Column({ type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer() })
    preco: number;


    @




     //Relacionamento com produto
    @ManyToOne(() => Categoria, (categoria) => categoria.produto,{
        onDelete: "CASCADE"
    })
    categoria: Categoria;

}