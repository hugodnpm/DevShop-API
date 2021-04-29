import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import * as bycript from 'bcrypt'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') // uuid = sequancial longo
  id: string

  @Column({ length: 250, nullable: false })
  name: string

  @Column({ length: 450, nullable: false })
  email: string

  @Column({length:450, nullable: false})
  passwd: string

  @Column({length:450, nullable: false})
  role: string // root(admin), user comum

  @Column({ type: 'timestamp', nullable: true})
  lastLogin: Date

  @Column({ type: 'timestamp'})
  createdAt: Date

  @Column({ type: 'timestamp'})
  updateAt: Date

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void>{
    if(this.passwd){
      this.passwd = await bycript.hash(this.passwd, 10)
    }
  }

  @BeforeInsert()
  setCreateDate(): void {
    this.createdAt = new Date()
    this.updateAt = new Date()
  }
  @BeforeUpdate()
  setUpdateDate(): void {
    this.updateAt = new Date()
  }
}
