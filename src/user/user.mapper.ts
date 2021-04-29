import { User } from './user.entity'
import { UserCreateInput } from './dto/user-create.input'

export class UserMapper {
  public static toEntity(input: UserCreateInput): User {
    const entity = new User()
    entity.name = input.name
    entity.email = input.email
    entity.role = input.role
    return entity
  }
}
