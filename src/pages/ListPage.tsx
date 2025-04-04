import { useEffect, useState } from 'react'
import { fetchRuns, Run } from '../data/fetchRuns'
import { Link } from 'react-router-dom'

function ListPage() {
  const [runs, setRuns] = useState<Run[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRuns().then((data) => {
      setRuns(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <p>Loading runs...</p>

  return (
    <div>
      <h1>Test Runs</h1>
      <ul>
        {runs.map((run) => (
          <li key={run.id} style={{ marginBottom: '1rem' }}>
            <Link to={`/run/${run.id}`}>
              <strong>{run.name}</strong> - {run.status} ({run.date})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListPage
