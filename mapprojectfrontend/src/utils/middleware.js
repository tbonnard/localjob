import { isCookieExpired } from "../services/checkToken"
import { expiredToken } from "../reducers/userReducer"

export function logger({ getState, dispatch }) {
  
  return next => action => {
    // console.log('will dispatch', action)
    if(isCookieExpired()) {
      dispatch(expiredToken())
    }
    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    // console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}