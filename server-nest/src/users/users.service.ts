import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SignUpDto } from './dto/signup.dto'
import { UserRepository } from './users.repository'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {}
  async signup(signupDto: SignUpDto) {
    return this.userRepository.createUser(signupDto)
  }
}
