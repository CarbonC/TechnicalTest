import { useEffect, useState } from 'react'

export function useFetch<D = unknown>(url: string) {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<D | null>()
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const getFetch = async () => {
      try {
        const res = await fetch(url, { signal: controller.signal })

        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)

        const data = (await res.json()) as D

        setData(data)
      } catch (error) {
        if (error instanceof Error) {
          setError(error)
        } else {
          setError(new Error('hook useFetch error'))
        }
      } finally {
        setLoading(false)
      }
    }
    getFetch()

    return () => {
      controller.abort()
      setLoading(false)
    }
  }, [url])

  return { data, error, loading } as const
}
