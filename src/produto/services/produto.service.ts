import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class ProdutoService{
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private readonly categoriaService: CategoriaService
    ){}

    async findAll(): Promise<Produto[]>{
        // SELECT * FROM tb_produtos
        return this.produtoRepository.find({
          relations:{
                categoria:true
            } 
        })
    }

    async findById(id: number): Promise<Produto>{
        // Select * FROM tb_produtos WHERE id = ?;
        const produto = await this.produtoRepository.findOne({
              where: {
                id
            }, 
            relations:{
                categoria:true
            } 
        })

        if(!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return produto;
}

       async findAllByDescricao(descricao: string): Promise<Produto[]>{
    // SELECT * FROM tb_produtos WHERE descricao LIKE '%?%';
    return this.produtoRepository.find({
      where:{
        descricao: ILike(`%${descricao}%`)
      }, 
      relations:{
                categoria:true
            } 
    })
  }

  async create(produto: Produto): Promise<Produto>{


    // INSERT INTO tb_produtos (nome, descrição, preço) VALUES (?, ?);
    return this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto>{

    if (!produto.id || produto.id <= 0)
      throw new HttpException("O ID da produto é inválido!", HttpStatus.BAD_REQUEST);

    // Checa se a produto existe
    await this.findById(produto.id);


    //Checa se a Categoria do Produto existe
    await this.categoriaService.findById(produto.categoria.id);
    

    return this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult>{
    
    await this.findById(id);

    // DELETE tb_produtos FROM id = ?;
    return this.produtoRepository.delete(id);
    
  }
}