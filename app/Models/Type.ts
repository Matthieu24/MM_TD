import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Movie from './Movie'

export default class Type extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public label: string

  @manyToMany(() => Movie)
  public movies: ManyToMany<typeof Movie>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
