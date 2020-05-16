import { 
    ADD_MARKET,
    ADD_MARKET_SUCCESS, 
    REMOVE_MARKET, 
    REMOVE_MARKET_SUCCESS,
    EDIT_MARKET, 
    EDIT_MARKET_SUCCESS,
    GET_MARKET,
    GET_MARKET_SUCCESS,
     
  } from 'constants/constants';
  
  export const getMarket = lastRef => ({
    type: GET_MARKET,
    payload: lastRef
  });
  
  export const getMarketSuccess = market => ({
    type: GET_MARKET_SUCCESS,
    payload: market
  });
  

  
  export const addMarket = market => ({
    type: ADD_MARKET,
    payload: market
  });
  
  export const addMarketSuccess = market => ({
    type: ADD_MARKET_SUCCESS,
    payload: market
  });
  
  export const removeMarket = id => ({
    type: REMOVE_MARKET,
    payload: id
  });
  
  export const removeMarketSuccess = id => ({
    type: REMOVE_MARKET_SUCCESS,
    payload: id
  });
  
  export const editMarket = (id, updates) => ({
    type: EDIT_MARKET,
    payload: {
      id,
      updates
    }
  });
  
  export const editMarketSuccess = updates => ({
    type: EDIT_MARKET_SUCCESS,
    payload: updates
  });
  