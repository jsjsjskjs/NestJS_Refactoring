import { BaseEntity ,Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('string')
  title: string

  @Column('string')
  sports: string

  @Column('string')
  division: string

  @Column('text')
  content: string

  @Column('date')
  startTime: string

  @Column('date')
  endTime: string

  @Column('string')
  status: string

  @Column('boolean')
  phoneOpen: boolean

  @Column('string')
  addressName: string
}