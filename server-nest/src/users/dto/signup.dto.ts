import { isNotEmpty } from 'class-validator'

export class SignUpDto {
  email: string

  nickname: string

  password: string

  userPhone: string

  favoriteSports: string

  homeground: string

  verified: boolean

  verifiedKey: string
}