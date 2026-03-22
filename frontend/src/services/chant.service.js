import api from './api'

export async function saveChant(payload) {
  const { data } = await api.post('/chants', payload)
  return data
}

export async function fetchAllChants() {
  const { data } = await api.get('/chants')
  return data
}

export async function fetchChantsByDate(date) {
  const { data } = await api.get(`/chants/date/${date}`)
  return data
}

