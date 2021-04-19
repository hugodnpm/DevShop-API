import { Category } from 'src/category/category.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 255, nullable: false })
  name: string

  @Column({ length: 900, nullable: false })
  description: string

  @Column({ length: 250, nullable: false })
  slug: string

  /*relation / association
  relacionando tabela categorias e produtos
  Product N -> 1 Category*/
  @ManyToOne(
    type => Category,
    category => category.id
  )
  category: Category
}
