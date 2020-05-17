import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from 'selectors/selector';
import Header from 'views/home/Header';
import ProductList from 'components/product/ProductList';
import Boundary from 'components/ui/Boundary';
import ProductItem from './ProductItem';
import ProductAppliedFilters from 'components/product/ProductAppliedFilters';

const Products = (props) => {
  const { productsLength, filter, isLoading, filteredProducts, requestStatus } = useSelector(state => ({
    productsLength: state.products.items.length,
    filter: state.filter,
    isLoading: state.app.loading,
    filteredProducts: selectFilter(state.products.items, state.filter),
    requestStatus: state.app.requestStatus
  }));
  const dispatch = useDispatch();

  const onClickAddProduct = () => {
    props.history.push('/dashboard/add');
  };

  return (
    <Boundary>
      <div className="product-admin-header">
        <h2 className="product-admin-header-title">Products</h2>
        <Header 
            dispatch={dispatch}
            productsLength={productsLength}
            filter={filter}
            filteredProducts={filteredProducts}
            isLoading={isLoading}
        />
        &nbsp;&nbsp;
        <button 
            className="button button-small"
            onClick={onClickAddProduct}
        >
          Nouveau produit
        </button>
      </div>
      <ProductList
          dispatch={dispatch}
          filteredProducts={filteredProducts}
          isLoading={isLoading}
          productsLength={productsLength}
          requestStatus={requestStatus}
      >
        <ProductAppliedFilters filter={filter}/>
          {filteredProducts.length > 0 && (
            <div className="grid grid-product grid-count-6">
              <div className="grid-col" />
              <div className="grid-col">
                <h5>Nom</h5>
              </div>
              <div className="grid-col">
                <h5>Marque</h5>
              </div>
              <div className="grid-col">
                <h5>Prix</h5>
              </div>
              <div className="grid-col">
                <h5>Date d'ajout</h5>
              </div>
              <div className="grid-col">
                <h5>Quantité</h5>
              </div>
            </div>
          )} 
          {filteredProducts.length === 0 ? new Array(10).fill({}).map((product, index) => (
            <ProductItem 
                key={`product-skeleton ${index}`}
                product={product}
            />
          )): filteredProducts.map(product => (
            <ProductItem 
                key={product.id}
                product={product}
                dispatch={dispatch}
            />
          ))}
      </ProductList>
    </Boundary>
  );
};

export default withRouter(Products);
