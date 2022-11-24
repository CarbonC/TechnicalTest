import React, { useReducer } from 'react'
import { IMetalBand } from '@/types/IMetalBand'

type ArtistFilteredProps = { metalBands: IMetalBand[] }

enum FilterInput {
  country = 'country',
  styles = 'styles',
  isSortByYear = 'isSortByYear'
}

interface InitialFilterInput {
  country: string
  styles: string
  isSortByYear: boolean
}

type Action = { type: FilterInput; payload: string }

const initialFilterInput: InitialFilterInput = {
  country: '',
  styles: '',
  isSortByYear: false
}

function reducerFilterInput(state: InitialFilterInput, action: Action) {
  const { payload, type } = action
  switch (type) {
    case FilterInput.country:
      return { ...state, country: payload }
    case FilterInput.styles:
      return { ...state, styles: payload }
    case FilterInput.isSortByYear:
      return { ...state, isSortByYear: !state.isSortByYear }
    default:
      throw new Error('error input filtered')
  }
}

export const ArtistFiltered: React.FC<ArtistFilteredProps> = ({
  metalBands
}) => {
  const [state, dispatch] = useReducer(reducerFilterInput, initialFilterInput)

  const listGroupFiltered = metalBands.filter((artist) => {
    if (
      (!state.country ||
        artist.origin.toLowerCase().includes(state.country.toLowerCase())) &&
      (!state.styles ||
        artist.style.toLowerCase().includes(state.styles.toLowerCase()))
    )
      return true
    return false
  })

  return (
    <div
      style={{
        maxWidth: '400px'
      }}
    >
      <form
        style={{
          textAlign: 'center'
        }}
      >
        <div>
          <input
            type="text"
            name="country"
            id="country"
            value={state.country}
            onChange={(e) =>
              dispatch({ type: FilterInput.country, payload: e.target.value })
            }
            placeholder="Country"
          />
        </div>
        <div>
          <input
            type="text"
            name="styles"
            id="styles"
            value={state.styles}
            onChange={(e) =>
              dispatch({ type: FilterInput.styles, payload: e.target.value })
            }
            placeholder="Styles"
          />
        </div>
        <div>
          <label htmlFor="styles">Year: </label>
          <input
            type="checkbox"
            name="year"
            id="year"
            checked={state.isSortByYear}
            onChange={() =>
              dispatch({ type: FilterInput.isSortByYear, payload: '' })
            }
          />
        </div>
      </form>
      <div>
        {listGroupFiltered
          .sort((a, b) => {
            switch (state.isSortByYear) {
              case true:
                return a.formed - b.formed
              default:
                return a.band_name.localeCompare(b.band_name, undefined, {
                  sensitivity: 'base'
                })
            }
          })
          .map(({ id, band_name, formed, origin, style }) => (
            <div
              key={id}
              style={{
                backgroundColor: 'hsla(0, 0%, 100%, 0.2)',
                textAlign: 'center',
                padding: '5px',
                margin: '10px 0',
                borderRadius: '12px'
              }}
            >
              <p>Name: {band_name}</p>
              <p>Formed: {formed}</p>
              <p>Country: {origin}</p>
              <p>Styles: {style}</p>
            </div>
          ))}
      </div>
    </div>
  )
}
