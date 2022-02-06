import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostRepository } from './posts.repository'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository) private postRepository: PostRepository
  ) {}
}
