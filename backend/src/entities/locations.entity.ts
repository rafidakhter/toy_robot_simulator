import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  row: number

  @Column()
  column: number

  @Column()
  orientation: string
}
