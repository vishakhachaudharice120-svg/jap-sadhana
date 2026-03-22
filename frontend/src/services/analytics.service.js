import api from './api'

export async function fetchSummary() {
  const { data } = await api.get('/analytics/summary')
  return data
}

export async function fetchMonthly(params) {
  const { data } = await api.get('/analytics/monthly', { params })
  return data
}

