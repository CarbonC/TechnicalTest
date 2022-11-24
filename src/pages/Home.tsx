import React from 'react'
import { ArtistFiltered } from '@/components'
import { useFetch } from '@/hooks'
import { IMetalBand } from '@/types/IMetalBand'

export const Home: React.FC = () => {
  const { data, loading, error } = useFetch<IMetalBand[]>(
    './assets/metal_bands_2017.json'
  )

  const style: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center'
  }

  return (
    <div style={style}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <ArtistFiltered metalBands={data ?? []} />
      )}
    </div>
  )
}
