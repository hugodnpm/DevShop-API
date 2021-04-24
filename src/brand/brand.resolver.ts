import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BrandMapper } from './brand.mapper'
import { BrandService } from './brand.service'
import { BrandPublic } from './dto/brand'
import { BrandCreateInput } from './dto/brand-create.input'
import { BrandUpdateInput } from './dto/brand-update.input'
import {GraphQLUpload, FileUpload} from 'graphql-upload'


@Resolver(of => BrandPublic)
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Query(returns => [BrandPublic], { name: 'getAllBrand' })
  async getAllBrand(): Promise<BrandPublic[]> {
    return this.brandService.findAll()
  }

  @Query(returns => BrandPublic, { name: 'getBrandById' })
  async getBrandById(@Args('id') id: string): Promise<BrandPublic> {
    return await this.brandService.findById(id)
  }
  @Query(returns => BrandPublic, { name: 'getBrandBySlug' })
  async getBrandBySlug(@Args('slug') slug: string): Promise<BrandPublic> {
    return await this.brandService.findBySlug(slug)
  }

  @Mutation(returns => BrandPublic, { name: 'createBrand' })
  async createBrand(
    @Args('input') input: BrandCreateInput
  ): Promise<BrandPublic> {
    return this.brandService.create(BrandMapper.toEntity(input))
  }
  @Mutation(returns => Boolean, { name: 'uploadBrandLogo' })
  async uploadLogo(
    @Args('id') id: string,
    @Args('file', {type: () => GraphQLUpload })
    file: FileUpload
  ): Promise<boolean> {
    const {createReadStream, filename, mimetype} = await file
    await this.brandService.uploadLogo(id, createReadStream, filename, mimetype)
    return true
  }


  @Mutation(returns => BrandPublic, { name: 'updateBrand' })
  async updateBrand(
    @Args('input') input: BrandUpdateInput
  ): Promise<BrandPublic> {
    return this.brandService.update(input)
  }

  @Mutation(returns => Boolean, { name: 'deleteBrand' })
  async deleteBrand(@Args('id') input: string): Promise<boolean> {
    return this.brandService.delete(input)
  }
}



/*
  @Mutation(returns => Boolean, { name: 'uploadBrandLogo' })
  async uploadBrandLogo(
    @Args('id') id: string,
    @Args('file', {type: () => GraphQLUpload})
    file: FileUpload
  ): Promise<boolean> {
    const {createReadStream, filename, mimetype} = await file
    await this.brandService.uploadLogo(id, createReadStream, filename, mimetype )// 
    return true
     
  }
*/