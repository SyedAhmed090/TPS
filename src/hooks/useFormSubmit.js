import { useState } from 'react'
import { supabase } from '../lib/supabase'

const DEFAULT_ERROR = 'Failed to send. Please try again or email us at info@thepatchsolutions.com'

export function useFormSubmit(functionName) {
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  async function submit(data) {
    setLoading(true)
    setSubmitError('')
    try {
      const { error } = await supabase.functions.invoke(functionName, { body: data })
      if (error) {
        setSubmitError(DEFAULT_ERROR)
        return false
      }
      return true
    } catch {
      setSubmitError(DEFAULT_ERROR)
      return false
    } finally {
      setLoading(false)
    }
  }

  return { submit, loading, submitError }
}
