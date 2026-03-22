import { format } from 'date-fns'
import { MANTRAS } from './constants'

export function formatDisplayDate(value, pattern = 'EEEE, dd MMM yyyy') {
  return format(new Date(value), pattern)
}

export function toInputDate(value = new Date()) {
  return format(new Date(value), 'yyyy-MM-dd')
}

export function formatCount(value = 0) {
  return new Intl.NumberFormat('en-IN').format(Number(value) || 0)
}

export function getMantraMeta(mantraId) {
  return MANTRAS.find((item) => item.id === mantraId) || MANTRAS[0]
}

