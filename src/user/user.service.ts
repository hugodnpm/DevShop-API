import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }
  async findById(id: string): Promise<User> {
    return this.userRepository.findOne(id)
  }
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: [{ email }] })
  }
  async create(input: User): Promise<User> {
    return this.userRepository.save(input)
  }
  async update(input: User): Promise<User> {
    await this.userRepository.update(input.id, {
      name: input.name,
      email: input.email
    })
    return input
  }
  async delete(id: string): Promise<boolean> {
    try {
      await this.userRepository.delete(id)
      return true
    } catch (err) {
      return false
    }
  }
}
