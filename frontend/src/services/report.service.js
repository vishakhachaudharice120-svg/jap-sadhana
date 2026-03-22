import api from './api'

export async function downloadReport(params) {
  const response = await api.get('/reports/download', {
    params,
    responseType: 'blob',
  })
  return response.data
}

export async function fetchReportSummary(params) {
  const response = await api.get('/reports/summary', { params })
  return response.data
}
