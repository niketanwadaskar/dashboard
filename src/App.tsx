// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import ListPage from './pages/ListPage'
import DetailsPage from './pages/DetailsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/run/:id" element={<DetailsPage />} />
    </Routes>
  )
}

export default App
