import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { fetchAllChants, saveChant } from '../services/chant.service'
import { toInputDate } from '../utils/formatters'

export function useChants() {
  const [chants, setChants] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  async function loadChants() {
    try {
      setIsLoading(true)
      const response = await fetchAllChants()
      setChants(response?.data?.chants || [])
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to load chants.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadChants()
  }, [])

  async function upsertChant(payload) {
    try {
      setIsSaving(true)
      const response = await saveChant(payload)
      const savedChant = response?.data?.chant
      setChants((current) => {
        const next = current.filter(
          (item) => !(item.mantraId === savedChant.mantraId && toInputDate(item.date) === toInputDate(savedChant.date)),
        )
        return [savedChant, ...next]
      })
      toast.success('Chant count saved.')
      return savedChant
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to save chant count.')
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  return {
    chants,
    isLoading,
    isSaving,
    reloadChants: loadChants,
    upsertChant,
  }
}

