import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SignUpDto } from './dto/signup.dto'
import { UserRepository } from './users.repository'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}
  async signup(signupDto: SignUpDto) {
    return this.userRepository.createUser(signupDto)
  }

  async signin(userData): Promise<{ userData: object, accessToken: string }> {
    const {
      id,
      email,
      nickname,
      password,
      userPhone,
      homeground,
      favoriteSports
    } = userData
    const user = await this.userRepository.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email }
      const accessToken = await this.jwtService.sign(payload)

      return { userData: {id, email, nickname, userPhone, homeground, favoriteSports}, accessToken: accessToken }
    } else {
      throw new UnauthorizedException('로그인 실패')
    }
  }
}
