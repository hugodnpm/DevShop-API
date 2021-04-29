import { Field, InputType } from '@nestjs/graphql'
import { Length, Validate } from 'class-validator'
import { UserEmailIsUnique } from '../validations/userEmailIsUnique'

@InputType()
export class UserCreateInput {
  @Field()
  @Length(3)
  name: string

  @Field()
  @Length(3)
  @Validate(UserEmailIsUnique)
  email: string

  @Field()
  @Length(3)
  role: string
}
