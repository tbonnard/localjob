import {combineReducers, applyMiddleware } from 'redux'
import { legacy_createStore as createStore} from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk'

import mapQueryReducer from './reducers/mapQueryReducer'
import propertyReducer from './reducers/propertyReducer';
import projectReducer from './reducers/projectReducer'
import notificationTempReducer from './reducers/notificationTempReducer';
import userReducer from './reducers/userReducer';
import followReducer from './reducers/followReducer';
import loadingReducer from './reducers/loadingReducer';
import boundsReducer from './reducers/boundsReducer';
import userLocationReducer from './reducers/userLocationReducer';
import followPropertiesGetProjectsReducer from './reducers/followPropertiesGetProjectsReducer'
import searchReducer from './reducers/searchReducer';
import centerPositionReducer from './reducers/centerPositionReducer';
import allProjectsNearbyPropertiesReducer from './reducers/allProjectsNearbyPropertiesReducer';
import tabHomeReducer from './reducers/tabHomeReducer';
import userPropertyReducer from './reducers/userPropertyReducer';
import cieProjectReducer from './reducers/cieProjectReducer';
import saveReducer from './reducers/saveReducer';
import applyReducer from './reducers/applyReducer';
import savedAppliedJobsReducer from './reducers/savedAppliedJobsReducer';

import {logger} from './utils/middleware';

const appReducer = combineReducers({
    mapQuery:mapQueryReducer,
    property:propertyReducer,
    projects:projectReducer,
    notificationTemp: notificationTempReducer,
    user:userReducer,
    followedProperties:followReducer,
    loadingFlag : loadingReducer,
    bounds:boundsReducer,
    userLocationFlag:userLocationReducer,
    followPropertiesGetProjects:followPropertiesGetProjectsReducer,
    searchItem:searchReducer,
    centerPosition:centerPositionReducer,
    allProjectsNearbyProperties:allProjectsNearbyPropertiesReducer,
    tabHome : tabHomeReducer,
    userProperty:userPropertyReducer,
    cieProject:cieProjectReducer,
    savedJobs:saveReducer,
    appliedJobs:applyReducer,
    savedAppliedJobs:savedAppliedJobsReducer
  })
  
  const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_USER') {
      return appReducer(undefined, action)
    }
    return appReducer(state, action)
  }
  
  const middlewares = [thunk, logger]

  const store = createStore(
            rootReducer,
            composeWithDevTools(applyMiddleware(...middlewares))
            )

  export default store