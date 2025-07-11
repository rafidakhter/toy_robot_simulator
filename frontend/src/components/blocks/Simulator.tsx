import { ControlBoard, Report, Robot, Table } from '@/components'
import { useRobotController } from '@/components/organisms/Robot/useRobotController'
import { MouseEventHandler, useEffect } from 'react'
import { Orientation } from '@toy-robot-simulator/shared'

const GRID_SIZE = 5

export function Simulator() {

  const robotController = useRobotController({
    gridSize: GRID_SIZE,
  })

  const handleGridItemClick: MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    const button = event.currentTarget
    const id = button.id
    const [row, column] = id.split('-').slice(1).map(Number)
    await robotController.placeRobot({
      row,
      column,
      orientation: robotController.location?.orientation || Orientation.NORTH,
    })
  }

  useEffect(() => {
    robotController.initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="simulator-container space-y-l4">
      <Table
        activeLocation={robotController.location}
        onClick={handleGridItemClick}
        tableItem={
          <Robot orientation={robotController.location?.orientation} />
        }
        gridSize={GRID_SIZE}
      />

      <ControlBoard
        onRotateAntiClockwiseClick={robotController.rotateAntiClockwise}
        onRotateClockwiseClick={robotController.rotateClockwise}
        onMoveClick={robotController.move}
        handleArrowKeyInteraction={robotController.handleArrowKeyInteraction}
        onResetClick={robotController.reset}
      />

      <Report reports={robotController.moveHistory} />
    </section>
  )
}
