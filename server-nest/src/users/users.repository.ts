import { EntityRepository, Repository } from 'typeorm'
import { SignUpDto } from './dto/signup.dto'
import { User } from './users.entity'
import * as bcypt from 'bcryptjs'
import * as crypto from 'crypto'
import {
  ConflictException,
  InternalServerErrorException,
  Post
} from '@nestjs/common'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(signupDto: SignUpDto) {
    let {
      email,
      nickname,
      password,
      userPhone,
      homeground,
      favoriteSports,
      verified
    } = signupDto
    const salt = await bcypt.genSalt()
    const hashedPW = await bcypt.hash(password, salt)
    const key1 = await crypto.randomBytes(256).toString('hex').substr(100, 10)
    const key2 = await crypto.randomBytes(256).toString('base64').substr(50, 10)
    const verifiedKey = key1 + key2
    verified = false
    const user = this.create({
      email,
      nickname,
      password: hashedPW,
      userPhone,
      homeground,
      favoriteSports,
      verified,
      verifiedKey
    })

    try {
      await this.save(user)
      return { message: '성공적으로 회원가입되었습니다' }
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('이름을 사용 중인 유저가 존재합니다')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }
}
