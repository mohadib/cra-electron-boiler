import axios from 'axios'

export function callAPIMiddleware({ dispatch, getState }) {

  return next => action => {
    const { type, types, callAPI, shouldCallAPI = () => true, payload } = action

    if (type !== 'CALL_API' || !types) {
      return next(action)
    }

    if (!shouldCallAPI(getState())) {
      return
    }

    const [requestType, successType, failureType] = types

    dispatch({ payload, type: requestType })

    const prom = callAPI()

    return prom
      .then(resp => {
        return dispatch({
          type: successType,
          payload: resp.data,
          headers: resp.headers,
          requestPayload: payload,
          responseCode: resp.status,
          raw: resp
        })
      })
      .catch(err => {

        if (process.env.NODE_ENV === 'development') {
          console.log(err)
        }

        if(axios.isCancel(err) && !err.message.dispatchCancelAction) return

        return dispatch({
          type: axios.isCancel(err) ? "CANCELLED" : failureType,
          payload: err.response ? err.response.data || {} : {},
          headers: err.response ? err.response.headers : {},
          requestPayload: payload,
          responseCode: err.response ? err.response.status : undefined,
          raw: err
        })
      })
  }
}
