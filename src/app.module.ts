import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BrandModule } from './brand/brand.module'
import { CategoryModule } from './category/category.module'
import { ProductModule } from './product/product.module'
import {graphqlUploadExpress} from "graphql-upload"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true
      })
    }),
    /*TypeOrmModule.forRoot({
      type: 'postgres',
      url: 
      autoLoadEntities: true,
      synchronize: true,
      //entities: [Category],
      logging: true
    }),*/
    GraphQLModule.forRoot({
      uploads: false,
      autoSchemaFile: 'schema.gql'
    }),
    CategoryModule,
    ProductModule,
    BrandModule
  ],

  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql')
  }
}
