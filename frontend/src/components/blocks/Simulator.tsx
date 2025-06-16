import { ControlBoard, Report, Robot, Table } from '@/components'
import { useRobotController } from '@/components/organisms/Robot/useRobotController'
import classNames from 'classnames'
import { MouseEventHandler, useEffect, useState } from 'react'
import { useToast } from '../molecules/Toast'
import { Orientation } from '@toy-robot-simulator/shared'

const GRID_SIZE = 5

export default function Simulator() {
  const { showToast } = useToast()

  const robotController = useRobotController({
    gridSize: GRID_SIZE,
    onInvalidMove: () => showToast('Invalid Move: Cant move in this direction'),
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
    <section className="simulator-container">
      <Table
        activeLocation={robotController.location}
        className="max-w-[400px]"
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
