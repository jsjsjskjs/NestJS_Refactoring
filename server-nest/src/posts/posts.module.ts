import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'
import { PostRepository } from './posts.repository'

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
