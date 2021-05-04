import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from './user.entity'


@Entity()
export class AuthToken {
  @PrimaryGeneratedColumn('uuid') // uuid = sequancial longo
  id: string

  @ManyToOne(
      type => User,
      user => user.authTokens 
  )
  user: User

  @Column({ type: 'timestamp'})
  createdAt: Date

 

 

  @BeforeInsert()
  setCreateDate(): void {
    this.createdAt = new Date()    
  }
  

  
}