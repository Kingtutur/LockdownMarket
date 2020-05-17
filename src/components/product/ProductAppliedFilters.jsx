import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { applyFilter } from 'actions/filterActions';

const ProductAppliedFilters = ({ filter }) => {
  const dispatch = useDispatch();
  const fields = ['brand', 'minPrice', 'maxPrice', 'sortBy', 'keyword'];

  const onRemoveKeywordFilter = () => {
    dispatch(applyFilter({ keyword: '' }));
  };

  const onRemovePriceRangeFilter = () => {
    dispatch(applyFilter({ minPrice: 0, maxPrice: 0 }));
  };

  const onRemoveBrandFilter = () => {
    dispatch(applyFilter({ brand: '' }));
  };

  const onRemoveSortFilter = () => {
    dispatch(applyFilter({ sortBy: '' }));
  };

  return !fields.some(key => !!filter[key]) ? null : (
    <div className="product-applied-filters">
      {filter.keyword && (
        <div className="pill-wrapper">
          <span className="d-block">mot-clé</span>
          <div className="pill padding-right-l">
            <h5 className="margin-0">{filter.keyword}</h5>
            <div className="pill-remove" onClick={onRemoveKeywordFilter}>
              <h5 className="margin-0 text-subtle">x</h5>
            </div>
          </div>
        </div>
      )}
      {filter.brand && (
        <div className="pill-wrapper">
          <span className="d-block">Marque</span>
          <div className="pill padding-right-l">
            <h5 className="margin-0">{filter.brand}</h5>
            <div className="pill-remove"onClick={onRemoveBrandFilter}>
              <h5 className="margin-0 text-subtle">x</h5>
            </div>
          </div>
        </div>
      )}
      {(!!filter.minPrice || !!filter.maxPrice) && (
        <div className="pill-wrapper">
          <span className="d-block">Range de prix</span>
          <div className="pill padding-right-l">
            <h5 className="margin-0">${filter.minPrice} - ${filter.maxPrice}</h5>
            <div className="pill-remove" onClick={onRemovePriceRangeFilter}>
              <h5 className="margin-0 text-subtle">x</h5>
            </div>
          </div>
        </div>
      )}
      {filter.sortBy && (
        <div className="pill-wrapper">
          <span className="d-block">Trier par</span>
          <div className="pill padding-right-l">
            <h5 className="margin-0">
              {filter.sortBy === 'price-desc' 
                ? 'Plus cher - Moins cher' 
                : filter.sortBy === 'price-asc' 
                ? 'Moin Cher - Plus cher'
                : filter.sortBy === 'name-desc'
                ? 'Name Z - A'
                : 'Name A - Z'
              }
            </h5>
            <div className="pill-remove" onClick={onRemoveSortFilter}>
              <h5 className="margin-0 text-subtle">x</h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProductAppliedFilters.propType = {
  filter: PropTypes.shape({
    brand: PropTypes.string,
    keyword: PropTypes.string,
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number
  })
};

export default ProductAppliedFilters;
