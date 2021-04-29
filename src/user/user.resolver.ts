import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserMapper } from './user.mapper'
import { UserService } from './user.service'
import { UserPublic } from './dto/user'
import { UserCreateInput } from './dto/user-create.input'
import { UserUpdateInput } from './dto/user-update.input'

@Resolver(of => UserPublic)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

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
    return this.userService.update(UserMapper.toEntity(input))
  }

  @Mutation(returns => Boolean, { name: 'deleteUser' })
  async deleteUser(@Args('id') input: string): Promise<boolean> {
    return this.userService.delete(input)
  }
}
