import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from 'selectors/selector';
import Header from 'views/home/Header';
import MarketList from 'components/market/MarketList';
import Boundary from 'components/ui/Boundary';
import MarketItem from './MarketItem';
import MarketAppliedFilters from 'components/market/MarketAppliedFilters';

const Markets = (props) => {
  const { marketsLength, filter, isLoading, filteredMarkets, requestStatus } = useSelector(state => ({
    marketsLength: state.market.items.length,
    filter: state.filter,
    isLoading: state.app.loading,
    filteredMarkets: selectFilter(state.market.items, state.filter),
    requestStatus: state.app.requestStatus
  }));
  const dispatch = useDispatch();
  const onClickAddMarket = () => {
    props.history.push('/dashboard/addMarket');
    console.log('test')
  };

  return (
    <Boundary>
      <div className="product-admin-header">
        <h2 className="product-admin-header-title">Marchés</h2>
    
        &nbsp;&nbsp;
        <button 
            className="button button-small"
            onClick={onClickAddMarket}
        >
         Ajout de marchés
        </button>
      </div>
      <MarketList
          dispatch={dispatch}
         filteredMarkets={filteredMarkets}
          isLoading={isLoading}
          marketsLength={marketsLength}
          requestStatus={requestStatus}
      >
        <MarketAppliedFilters filter={filter}/>
          {filteredMarkets.length > 0 && (
            <div className="grid grid-product grid-count-6">
              <div className="grid-col" />
              <div className="grid-col">
                <h5>Nom</h5>
              </div>
              <div className="grid-col">
                <h5>adresse</h5>
              </div>
              <div className="grid-col">
                <h5>Date</h5>
              </div>
              <div className="grid-col">
                <h5>Cut off time</h5>
              </div>
            </div>
          )} 
          {filteredMarkets.length === 0 ? new Array(10).fill({}).map((market, index) => (
            <MarketItem 
                key={`market-skeleton ${index}`}
                market={market}
            />
          )): filteredMarkets.map(market => (
            <MarketItem 
                key={market.id}
                 market={market}
                dispatch={dispatch}
            />
          ))}
      </MarketList>
    </Boundary>
  );
};

export default withRouter(Markets);
