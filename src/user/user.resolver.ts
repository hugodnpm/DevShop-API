import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserMapper } from './user.mapper'
import { UserService } from './user.service'
import { UserPublic } from './dto/user'
import { UserCreateInput } from './dto/user-create.input'
import { UserUpdateInput } from './dto/user-update.input'
import { AuthToken } from './dto/auth'
import { JwtService } from '@nestjs/jwt'
import { AuthUserInput } from './dto/auth-user.input'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/utils/jwt-auth.guard'
import { AuthUserid } from 'src/utils/jwt-user.decorator'

@Resolver(of => UserPublic)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
    ) {}

  @Query(returns => [UserPublic], { name: 'getAllUsers' })
  async getAllUsers(): Promise<UserPublic[]> {
    return this.userService.findAll()
  }

  @Query(returns => UserPublic, { name: 'getUserById' })
  async getUserById(@Args('id') id: string): Promise<UserPublic> {
    return await this.userService.findById(id)
  }
 

  @Mutation(returns => UserPublic, { name: 'createUser' })
  async createUser(
    @Args('input') input: UserCreateInput
  ): Promise<UserPublic> {
    return this.userService.create(UserMapper.toEntity(input))
  }
  @Mutation(returns => UserPublic, { name: 'updateUser' })
  async updateUser(
    @Args('input') input: UserUpdateInput
  ): Promise<UserPublic> {
    return this.userService.update(UserMapper.toUpdateEntity(input))
  }

  @Mutation(returns => Boolean, { name: 'deleteUser' })
  async deleteUser(@Args('id') input: string): Promise<boolean> {
    return this.userService.delete(input)
  }

  @Mutation(returns => AuthToken, { name: 'auth' })
  async auth(@Args('input') input: AuthUserInput): Promise<AuthToken> {
    const [user, refreshToken] = await this.userService.auth(input.email, input.passwd)
    if(user){
      const authToken = new AuthToken()
      authToken.refreshToken = this.jwtService.sign({
      scope: ['refreshToken'],
      id: refreshToken.id
    }, {
      expiresIn: '8 hours'
    })
    authToken.accessToken = this.jwtService.sign({
      scope: ['accessToken', user.role],
      id: user.id
    }, {
      expiresIn: '1 hour'
    })
    return authToken
    }
    throw new Error('Bad credentials')
    
  }

  @Mutation(returns => String, { name: 'accessToken' })
  async accessToken(@Args('refreshToken') refreshToken: string): Promise<string> {
    const decoded = this.jwtService.verify(refreshToken)
    if(decoded && decoded.scope.indexOf('refreshToken') >= 0){
      const authToken = await this.userService.getRefreshToken(decoded.id)
      const accessToken = this.jwtService.sign(
        {
          scope: ['accessToken', authToken.user.role],
          id: authToken.user.id
        }, {
          expiresIn: '1 hour'
        }
        )
        return accessToken
      
    }
    return null 
  }

  @UseGuards(AuthGuard)
  @Query(returns => UserPublic, { name: 'getMe' })
  async getMe(@AuthUserid() id: string): Promise<UserPublic> {    
    return await this.userService.findById(id)
  }

}
