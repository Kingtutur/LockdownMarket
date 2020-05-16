import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { editMarket } from 'actions/marketActions';

import MarketForm from './MarketForm';

const EditMarket = (props) => {
  const { market, isLoading } = useSelector(state => ({
    market: state.market.items.find(market => market.id === props.match.params.id),
    isLoading: state.app.loading
  }));
  const dispatch = useDispatch();

  const onSubmitForm = (updates) => {
    dispatch(editMarket(market.id, updates));
  };

  return (
    <>
      {!market && <Redirect to="/dashboard/market" />}
      <h2>Edition Marché</h2>
      <MarketForm 
          isLoading={isLoading}
          onSubmit={onSubmitForm}
          market={market} 
      />
    </>
  );
};

export default withRouter(EditMarket);
