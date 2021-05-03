import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { User } from './user.entity'
import { UserEmailIsUnique } from './validations/userEmailIsUnique'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET')
      })      
    })
  ],
  providers: [UserService, UserResolver, UserEmailIsUnique]
})
export class UserModule {}
