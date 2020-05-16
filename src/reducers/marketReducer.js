import { 
    ADD_MARKET_SUCCESS, 
    REMOVE_MARKET_SUCCESS, 
    EDIT_MARKET_SUCCESS,
    GET_MARKET_SUCCESS 
  } from 'constants/constants';
  
  export default (state = {
    lastRefKey: null,
    total: 0,
    items: []
  }, action) => {
    switch (action.type) {
      case   GET_MARKET_SUCCESS :
        return {
          ...state,
          lastRefKey: action.payload.lastKey,
          total: action.payload.total,
          items: [ ...state.items, ...action.payload.market ]
        };
      case ADD_MARKET_SUCCESS:
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      case REMOVE_MARKET_SUCCESS:
        return {
          ...state,
          items: state.items.filter(market => market.id !== action.payload)
        }
      case EDIT_MARKET_SUCCESS:
        return {
          ...state,
          items: state.items.map((market) => {
            if (market.id === action.payload.id) {
              return {
                ...market,
                ...action.payload.updates
              };
            }
            return market;
          }) 
        };
      default:
        return state;
    }
  };
  