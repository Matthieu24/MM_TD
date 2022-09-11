import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Type from './Type'

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public duration: number

  @column()
  public cover: string

  @column()
  public studio: string

  @column.dateTime()
  public date: DateTime

  @manyToMany(() => Type)
  public types: ManyToMany<typeof Type>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}