import classNames from 'classnames'
import { useState } from 'react'

export function Report({ reports }: Report.Props) {
  const [displayReport, setDisplayReport] = useState(false)

  return (
    <>
      {/* report */}
      <button
        className="button-secondary"
        onClick={() => setDisplayReport((prev) => !prev)}
      >
        <span className="button-secondary-content">Report</span>
      </button>

      {/* robot report */}
      <div
        className={classNames('report-container ', {
          'opacity-0 translate-y-[110%]': !displayReport,
        })}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Report:</h2>
          <button onClick={() => setDisplayReport(false)}>close</button>
        </div>

          <ul className="list-disc pl-l2">
            {reports.map((action, i) => (
              <li key={action + i}>{action}</li>
            ))}
          </ul>
      </div>
    </>
  )
}

namespace Report {
  export type Props = {
    reports: string[]
  }
}
