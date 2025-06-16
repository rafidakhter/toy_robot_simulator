import { Orientation } from '@toy-robot-simulator/shared'

export type Location = {
  row: number
  column: number
  orientation: Orientation
}

export namespace Location {
  export function guard(location: any): location is Location {
    return (
      typeof location === 'object' &&
      location !== null &&
      typeof location.row === 'number' &&
      typeof location.column === 'number' &&
      Object.values(Orientation).includes(location.orientation)
    )
  }
}
