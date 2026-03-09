import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produto/produto.module';
import { Produto } from './produto/entities/produto.entity';



@Module({
  imports: [  TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '7803luxO.',
      database: 'db_loja_de_games',
      entities: [Produto],
      synchronize: true,
    }),
  ProdutoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
