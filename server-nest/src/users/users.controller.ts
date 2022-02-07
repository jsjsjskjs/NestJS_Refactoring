import { Body, Controller, Post } from '@nestjs/common'
import { SignUpDto } from './dto/signup.dto'
import { User } from './users.entity'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  signUp(@Body() signupDto: SignUpDto) {
    return this.usersService.signup(signupDto)
  }

  @Post('/signin')
  signIn(
    @Body() userData: { email: string, password: string }
  ): Promise<{ userData: object, accessToken: string }> {
    return this.usersService.signin(userData)
  }
}
