import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '../ui/CircularProgress';
import { getMarket } from 'actions/marketActions';
import { isLoading as dispatchIsLoading } from 'actions/appActions';

const MarketList = ({ 
  isLoading, 
  requestStatus, 
  marketsLength,
  filteredMarketsLength, 
  lastRefKey,
  totalItems,
  dispatch,
  children 
}) => {
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [isFetching, setFetching] = useState(false);
  const [scrolledAtBottom, setScrolledAtBottom] = useState(false);

  useEffect(() => {
    if (marketsLength === 0)  {
      fetchMarkets();
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
    
    if (scrolled === 1 && !!lastRefKey && !isLoading && marketsLength < totalItems ) {
      setLastScrollPos(window.pageYOffset);
      setScrolledAtBottom(true);
      window.removeEventListener('scroll', watchForScroll);
    } 
  };

  const fetchMarkets = () => {
    setFetching(true);
    dispatch(getMarket(lastRefKey));
  };
   

  return filteredMarketsLength === 0 && !isLoading && !requestStatus ? (
    <div className="loader">
      <h3 className="text-center">Aucun marché trouvé</h3>
      <span>Utilisez les bons filtres</span>
    </div>
  ) : requestStatus ? (
    <div className="loader">
      <h3 className="text-center">{requestStatus}</h3>
      <br/>
      <button 
          className="button button-small"
          onClick={fetchMarkets}
      >
        Réessayer 
      </button>
    </div>
  ) : (
    <>
    {children}
    {(scrolledAtBottom && marketsLength < totalItems) && (
      <div className="d-flex-center padding-l">
        <button 
            className="button button-small"
            disabled={isFetching}
            onClick={fetchMarkets}
        >
          {isFetching ? 'Recherche de marchés...' : 'Rechercher plus de marchés'}
        </button>
      </div>
    )}
    {(!isFetching && marketsLength >= totalItems) && (
      <div className="d-flex-center padding-l">
        <span>Fin des resultats</span>
      </div>
    )}
    </>
  )
};

MarketList.propType = {
  isLoading: PropTypes.bool.isRequired,
  requestStatus: PropTypes.string.isRequired,
  marketsLength: PropTypes.number.isRequired,
  filteredMarketsLength: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default MarketList;

