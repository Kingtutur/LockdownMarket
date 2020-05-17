import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from 'selectors/selector';
import Header from 'views/home/Header';
import SellerList from 'components/seller/SellerList';
import Boundary from 'components/ui/Boundary';
import SellerItem from './SellerItem';
import SellersAppliedFilters from 'components/seller/SellerAppliedFilters';

const Sellers = (props) => {
  const { sellersLength, filter, isLoading, filteredSellers, requestStatus } = useSelector(state => ({
    sellersLength: state.market.items.length,
    filter: state.filter,
    isLoading: state.app.loading,
    filteredSellers: selectFilter(state.seller.items, state.filter),
    requestStatus: state.app.requestStatus
  }));
  const dispatch = useDispatch();
  const onClickAddMarket = () => {
    props.history.push('/dashboard/addSeller');
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
         Ajout de Marchand
        </button>
      </div>
      <SellerList
          dispatch={dispatch}
          filteredSellers={filteredSellers}
          isLoading={isLoading}
          sellersLength={sellersLength}
          requestStatus={requestStatus}
      >
        <SellersAppliedFilters filter={filter}/>
          {filteredSellers.length > 0 && (
            <div className="grid grid-product grid-count-6">
              <div className="grid-col" />
              <div className="grid-col">
                <h5>Nom</h5>
              </div>
              <div className="grid-col">
                <h5>Type</h5>
              </div>
              
              <div className="grid-col">
                <h5>Cut off time</h5>
              </div>
            </div>
          )} 
          {filteredSellers.length === 0 ? new Array(10).fill({}).map((seller, index) => (
            <SellerItem 
                key={`market-skeleton ${index}`}
                seller={seller}
            />
          )): filteredSellers.map(seller => (
            <SellerItem 
                key={seller.id}
                 seller={seller}
                dispatch={dispatch}
            />
          ))}
      </SellerList>
    </Boundary>
  );
};

export default withRouter(Sellers);
