export enum Orientation {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}

export interface LocationDto {
  row: number
  column: number
  orientation: Orientation
}
