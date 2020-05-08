import  { pathToRegexp } from 'path-to-regexp'
import queryString from 'query-string'


const keys = []
const urlRegexp = pathToRegexp('/:grouping?/:asset?/:inspection?/:component?/:resource?/:annotation?/:annotatedResource?', keys)

export const initialState = {
  grouping: null,
  asset: null,
  inspection: null,
  component: null,
  resource: null,
  annotation: null,
  annotatedResource: null,
  key: null,
  action: null,
  query: {}
}

export const LOCATION_CHANGE = 'applicationRouting/LOCATION_CHANGE'

export default ( state = initialState, { type, payload } ) => {
  if(type === LOCATION_CHANGE ) {

    const {
      location: {
        pathname,
        search,
        key
      },
      action
    } = payload

    const match = urlRegexp.exec(pathname)
    const params = !match ? {} : match.slice(1).reduce((acc, val, idx) => {
      acc[keys[idx].name] = val
      return acc
    }, {})

    return {
      ...state,
      ...params,
      key,
      query: {
        ...queryString.parse(search)
      },
      action
    }
  }

  return state
}

export const locationChange = ( location , action ) => ({
  type: LOCATION_CHANGE,
  payload: {
    location,
    action
  }
})