import { BaseEntity ,Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity()
@Unique(['nickname'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  nickname: string
  
  @Column()
  password: string

  @Column()
  userPhone: string

  @Column()
  homeground: string

  @Column()
  favoriteSports: string

  @Column()
  verified: boolean

  @Column()
  verifiedKey: string
}