import { Field, InputType } from '@nestjs/graphql'
import { IsUUID, Length, Matches, Validate } from 'class-validator'
import { CategorySlugIsUnique } from '../validations/CategorySlugIsUnique'

@InputType()
export class CategoryUpdateInput {
  @Field()
  @IsUUID()
  id: string
  @Field()
  @Length(3)
  name: string
  @Field()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @Length(3)
  @Validate(CategorySlugIsUnique)
  slug: string
}
