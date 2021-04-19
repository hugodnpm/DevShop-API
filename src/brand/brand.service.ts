import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { S3 } from 'src/utils/s3'
import { Repository } from 'typeorm'
import { Brand } from './brand.entity'
import * as fs from 'fs'

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    private s3: S3
  ) {}
  async findAll(): Promise<Brand[]> {
    return this.brandRepository.find()
  }
  async findById(id: string): Promise<Brand> {
    return this.brandRepository.findOne(id)
  }
  async findBySlug(slug: string): Promise<Brand> {
    return this.brandRepository.findOne({ where: [{ slug }] })
  }
  async create(input: Brand): Promise<Brand> {
    return this.brandRepository.save(input)
  }
  async uploadLogo(input: string): Promise<Brand> {
    const stream = fs.createReadStream('./logo3.png') 
    await this.s3.upload('tests.png', stream, 'image/png', 'devshophugo', 'tests.png')
    return null
  }

  async update(input: Brand): Promise<Brand> {
    await this.brandRepository.update(input.id, {
      name: input.name,
      slug: input.slug
    })
    return input
  }
  async delete(id: string): Promise<boolean> {
    try {
      await this.brandRepository.delete(id)
      return true
    } catch (err) {
      return false
    }
  }
}
