import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '../ui/CircularProgress';
import { getSeller } from 'actions/sellerActions';
import { isLoading as dispatchIsLoading } from 'actions/appActions';

const SellerList = ({ 
  isLoading, 
  requestStatus, 
  sellersLength,
  filteredSellersLength, 
  lastRefKey,
  totalItems,
  dispatch,
  children 
}) => {
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [isFetching, setFetching] = useState(false);
  const [scrolledAtBottom, setScrolledAtBottom] = useState(false);

  useEffect(() => {
    if (sellersLength === 0)  {
      fetchSellers();
    }
  
    return () => dispatch(dispatchIsLoading(false));
  }, []);

  useEffect(() => {
    window.scrollTo(0, lastScrollPos);
    setFetching(false);
  }, [lastRefKey]); // watch for changes on lastRefKey, if it changes that means new products have been fetched.

  useEffect(() => {
    window.addEventListener('scroll', watchForScroll);

    return () => window.removeEventListener('scroll', watchForScroll);
  }, [lastRefKey, isLoading]); // re-add event listener since the height of the window has increased for fetching new items.

  const watchForScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = winScroll / height;  // value of 1 means it's at the bottom
    
    if (scrolled === 1 && !!lastRefKey && !isLoading && sellersLength < totalItems ) {
      setLastScrollPos(window.pageYOffset);
      setScrolledAtBottom(true);
      window.removeEventListener('scroll', watchForScroll);
    } 
  };

  const fetchSellers = () => {
    setFetching(true);
    dispatch(getSeller(lastRefKey));
  };
   

  return filteredSellersLength === 0 && !isLoading && !requestStatus ? (
    <div className="loader">
      <h3 className="text-center">There are no items found</h3>
      <span>Try using correct filters and keyword</span>
    </div>
  ) : requestStatus ? (
    <div className="loader">
      <h3 className="text-center">{requestStatus}</h3>
      <br/>
      <button 
          className="button button-small"
          onClick={fetchSellers}
      >
        Try again
      </button>
    </div>
  ) : (
    <>
    {children}
    {(scrolledAtBottom && sellersLength < totalItems) && (
      <div className="d-flex-center padding-l">
        <button 
            className="button button-small"
            disabled={isFetching}
            onClick={fetchSellers}
        >
          {isFetching ? 'Fetching Items...' : 'Fetch More Items'}
        </button>
      </div>
    )}
    {(!isFetching && sellersLength >= totalItems) && (
      <div className="d-flex-center padding-l">
        <span>End of result.</span>
      </div>
    )}
    </>
  )
};

SellerList.propType = {
  isLoading: PropTypes.bool.isRequired,
  requestStatus: PropTypes.string.isRequired,
  sellersLength: PropTypes.number.isRequired,
  filteredSellersLength: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default SellerList;

