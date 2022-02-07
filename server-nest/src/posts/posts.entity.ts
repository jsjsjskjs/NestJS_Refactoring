import { BaseEntity ,Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  sports: string

  @Column()
  division: string

  @Column()
  content: string

  @Column()
  startTime: string

  @Column()
  endTime: string

  @Column()
  status: string

  @Column()
  phoneOpen: boolean

  @Column()
  addressName: string
}