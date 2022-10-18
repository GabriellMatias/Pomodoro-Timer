import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CycleContext'
import { HistoryContainer, HistoryList, Status } from './styles'
import { formatDistanceToNow } from 'date-fns'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>My History</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycles) => {
              return (
                <tr key={cycles.id}>
                  <td>{cycles.task}</td>
                  <td>{cycles.minutes} minutes</td>
                  <td>
                    {formatDistanceToNow(new Date(cycles.startDate), {
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {/* usa o && pra nao precisar passar um else nesse if */}
                    {cycles.finishDate && (
                      <Status statusColor="green">Conclude</Status>
                    )}

                    {cycles.interruptedDate && (
                      <Status statusColor="red">Interrupted</Status>
                    )}

                    {!cycles.finishDate && !cycles.interruptedDate && (
                      <Status statusColor="yellow">In Progress</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
