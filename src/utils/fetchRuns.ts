// src/data/fetchRuns.ts
import runs from '../data/runs.json'

export type Run = {
  id: string
  name: string
  status: string
  date: string
  description: string
  duration: string
  modelUrl?: string
}

export const fetchRuns = (): Promise<Run[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(runs)
    }, 800) // simulating network delay
  })
}

export const fetchRunById = (id: string): Promise<Run | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(runs.find((run) => run.id === id))
    }, 800)
  })
}
