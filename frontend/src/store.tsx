//@ts-nocheck
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import offlineConfig from "redux-offline/lib/defaults";
import {offline} from "redux-offline";
import logger from "redux-logger";
import * as localforage from "localforage";
import rootReducer from "./reducers/reducers";
import axios from "axios";

// Import your reducers
// import someReducer from './reducers/someReducer';

offlineConfig.persistOptions = { storage: localforage };

const customConfig = {
  ...offlineConfig,
  effect: (effect, action) => {
    return axios.post(effect.url, action.payload && action.payload.content);
  },
};


const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(thunk, logger), offline(customConfig))
);

export default store;
