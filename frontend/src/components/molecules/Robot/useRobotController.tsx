import { useState } from 'react'
import { Location} from '@/models'
import { LocationService } from '@/services'
import { useToast } from './Toast'
import { Orientation } from '@toy-robot-simulator/shared'

const SERVER_ERROR_MESSAGE = 'OOPS! Unable To Save Location'

export function useRobotController({
  gridSize,
  locationService = new LocationService(),
}: Controller.Props & {
  locationService?: LocationService
}): Controller.Controls {
  const { showToast } = useToast()
  const { COMMANDS } = Controller
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  const [location, setLocation] = useState<Location | undefined>()

  const isValidOrientation = (orientation: Orientation) => Object.values(Orientation).includes(orientation)
  const isValidLocation = ({ row, column, orientation }: Location): boolean =>
    row >= 0 &&
    row < gridSize &&
    column >= 0 &&
    column < gridSize &&
    isValidOrientation(orientation)

  const updateReport = (message: string) =>
    setMoveHistory((prev) => [...prev, message])

  const withErrorToast = <T extends any[]>(
    fn: (...args: T) => Promise<any>,
    errorMsg: string,
  ) => {
    return async (...args: T) => {
      try {
        return await fn(...args)
      } catch (error) {
        console.error(errorMsg, error)
        showToast(errorMsg)
      }
    }
  }

  const updateLocation = withErrorToast(
    async (futureLocation: Location, action: Controller.COMMANDS) => {
      if (!isValidLocation(futureLocation)) {
        showToast('Invalid Move')
        return
      }
      setLocation(futureLocation)
      updateReport(
        `${action} (${futureLocation.row}, ${futureLocation.column}) ${futureLocation.orientation}.`,
      )
      return await locationService.updateLocation(futureLocation)
    },
    SERVER_ERROR_MESSAGE,
  )

  const rotate = withErrorToast(
    async (direction: 'CLOCKWISE' | 'ANTICLOCKWISE') => {
      if (!location) return
      const orientationMap: Record<Orientation, Orientation> = {
        [Orientation.NORTH]: direction === 'CLOCKWISE' ? Orientation.EAST : Orientation.WEST,
        [Orientation.EAST]: direction === 'CLOCKWISE' ? Orientation.SOUTH : Orientation.NORTH,
        [Orientation.SOUTH]: direction === 'CLOCKWISE' ? Orientation.WEST : Orientation.EAST,
        [Orientation.WEST]: direction === 'CLOCKWISE' ? Orientation.NORTH : Orientation.SOUTH,
      }
      await updateLocation(
        { ...location, orientation: orientationMap[location.orientation] },
        direction === 'CLOCKWISE' ? COMMANDS.RIGHT : COMMANDS.LEFT,
      )
    },
    SERVER_ERROR_MESSAGE,
  )

  const getFutureLocation = (
    futureOrientation: Orientation,
  ): Location | undefined => {
    if (!location) return
    const movementMap: Record<Orientation, { row: number; column: number }> = {
      NORTH: { row: 1, column: 0 },
      SOUTH: { row: -1, column: 0 },
      EAST: { row: 0, column: 1 },
      WEST: { row: 0, column: -1 },
    }
    const movement = movementMap[futureOrientation]
    return {
      ...location,
      row: location.row + movement.row,
      column: location.column + movement.column,
    }
  }

  const move = withErrorToast(async () => {
    if (!location) return
    const futureLocation = getFutureLocation(location.orientation)

    if (futureLocation && isValidLocation(futureLocation)) {
      await updateLocation(futureLocation, COMMANDS.MOVE)
    }
  }, SERVER_ERROR_MESSAGE)

  const initialize = withErrorToast(async () => {
    const lastCoordinates = await locationService.getLastLocation()
    if (lastCoordinates && isValidLocation(lastCoordinates)) {
      await updateLocation(lastCoordinates, COMMANDS.RESTORED)
    } else {
      showToast('Invalid location')
    }
  }, 'Unable to retrieve last location ')

  const placeRobot = withErrorToast(async (placedLocation: Location) => {
    await updateLocation(placedLocation, COMMANDS.PLACED)
  }, SERVER_ERROR_MESSAGE)

  const handleArrowKeyInteraction = withErrorToast(
    async (event: KeyboardEvent) => {
      if (!location) return
      const keyToOrientation: Record<string, Orientation> = {
        ArrowLeft: Orientation.WEST,
        ArrowUp: Orientation.NORTH,
        ArrowRight: Orientation.EAST,
        ArrowDown: Orientation.SOUTH,
      }
      const newOrientation = keyToOrientation[event.key]
      if (!newOrientation) return
      event.preventDefault()
      const futureLocation = getFutureLocation(newOrientation)
      if (futureLocation) {
        await updateLocation(
          { ...futureLocation, orientation: newOrientation },
          COMMANDS.MOVE,
        )
      }
    },
    SERVER_ERROR_MESSAGE,
  )

  const reset = () => {
    setLocation(undefined)
    updateReport(COMMANDS.RESET)
  }

  return {
    location,
    rotateClockwise: () => rotate('CLOCKWISE'),
    rotateAntiClockwise: () => rotate('ANTICLOCKWISE'),
    move,
    placeRobot,
    moveHistory,
    initialize,
    handleArrowKeyInteraction,
    reset,
  }
}

export namespace Controller {
  export type Props = {
    gridSize: number
    onInvalidMove: () => void
  }

  export type Controls = {
    location: Location | undefined
    rotateClockwise: () => Promise<void>
    rotateAntiClockwise: () => Promise<void>
    move: () => Promise<void>
    placeRobot: (placedLocation: Location) => Promise<void>
    moveHistory: Array<string>
    initialize: () => Promise<void>
    handleArrowKeyInteraction: (event: KeyboardEvent) => Promise<void>
    reset: () => void
  }

  export enum COMMANDS {
    PLACED = 'PLACED',
    MOVE = 'MOVE',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    RESTORED = 'RESTORED',
    RESET = 'RESET',
  }
}
