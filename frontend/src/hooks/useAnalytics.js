import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { fetchMonthly, fetchSummary } from '../services/analytics.service'

export function useAnalytics(selectedMantra, month, year) {
  const [summary, setSummary] = useState({})
  const [grandTotal, setGrandTotal] = useState(0)
  const [monthlyData, setMonthlyData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadAnalytics() {
      try {
        setIsLoading(true)
        const [summaryResponse, monthlyResponse] = await Promise.all([
          fetchSummary(),
          fetchMonthly({ mantraId: selectedMantra, month, year }),
        ])
        setSummary(summaryResponse?.data?.totals || {})
        setGrandTotal(summaryResponse?.data?.grandTotal || 0)
        setMonthlyData(monthlyResponse?.data?.data || [])
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Unable to load analytics.')
      } finally {
        setIsLoading(false)
      }
    }

    loadAnalytics()
  }, [selectedMantra, month, year])

  return {
    summary,
    grandTotal,
    monthlyData,
    isLoading,
  }
}

