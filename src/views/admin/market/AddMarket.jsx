import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MarketForm from './MarketForm';
import {  addMarket } from 'actions/MarketActions';

const AddMarket = () => {
  const isLoading = useSelector(state => state.app.loading);
  const dispatch = useDispatch();

  const onSubmit = (market) => {
    dispatch(addMarket(market));
  };

  return (
    <div>
      <h2>Nouveau Marché</h2>
      <MarketForm 
          isLoading={isLoading}
          onSubmit={onSubmit}
      />
    </div>
  );
};

export default withRouter(AddMarket);
