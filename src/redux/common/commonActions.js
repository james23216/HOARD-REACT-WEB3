import axios from "axios";
import { forEach, camelCase } from "lodash";
import { metadata } from "../../utils/metadata";

export const saveKeyword = (payload) => {
  return {
    type: "SAVE_KEYWORD",
    payload: payload,
  };
};

export const loadMetaData = () => {
  return async dispatch => {
    dispatch({ type: 'START_LOAD_METADATA' });
    
    function onSuccess(success) {
      let rawData = success.data.values;
      let keys = rawData[1].slice(1, rawData[1].length);
      let metaData = [];
      rawData.forEach((o, idx) => {
        if (idx > 1) {
          let item = {};
          keys.forEach((key, kIdx) => {
            if (camelCase(key) === 'wordPressPathAndName') {
              let wordPressPathAndName = '';
  
              if (o[kIdx + 1] && o[kIdx + 1].includes("http://hoardtoken.com")) {
                let pathArray = o[kIdx + 1].split("http://hoardtoken.com")[1];
                wordPressPathAndName = "http://www.cryptohoard.io" + pathArray;
              }
              item[camelCase(key)] =  kIdx < o.length ? wordPressPathAndName : '';
            } else {
              item[camelCase(key)] =  kIdx < o.length ? o[kIdx + 1] : '';
            }
          });
          metaData.push(item);
        }
      });

      dispatch({ type: 'LOAD_METADATA', payload: metaData });
      return metaData;
    }
    function onError(error) {
      console.log('metadata: ', error);
      return error;
    }
    try {
      const success = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/1zKw_NntxvRGbqqibPrrSzc4okLuF_i3gqyOxef381T8/values/HOARD_WEBSITE?alt=json&key=AIzaSyDk8yYgkTfh32Id-t0n2C_HzN21EhoPU7U');
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  }
};