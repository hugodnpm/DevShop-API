import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Brand
 {
  @PrimaryGeneratedColumn('uuid') // uuid = sequancial longo
  id: string
  @Column({ length: 250, nullable: false })
  name: string
  @Column({ length: 250, nullable: false })
  slug: string
}
