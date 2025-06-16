import { LocationDto } from '@toy-robot-simulator/shared'
import { IsNumber, Min, IsEnum } from 'class-validator'

export enum Orientation {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST',
}

export class CreateLocationDto implements LocationDto {
  @IsNumber()
  @Min(0)
  row!: number

  @IsNumber()
  @Min(0)
  column!: number

  @IsEnum(Orientation, {
    message: 'Orientation must be one of: NORTH, SOUTH, EAST, WEST',
  })
  orientation!: Orientation
}
