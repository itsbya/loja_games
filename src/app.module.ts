import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produto/produto.module';
import { Produto } from './produto/entities/produto.entity';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';




@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '7803luxO.',
      database: 'db_loja_de_games',
      entities: [Produto, Categoria, Usuario],
      synchronize: true,
    }),
  ProdutoModule, 
  CategoriaModule,
  AuthModule,
  UsuarioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
