import { PropTypes } from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllData, resetRegionsState } from '../redux/regions/regions';
import LoadingSpinner from './LoadingSpinner';
import RegionItem from './RegionItem';

function RegionList({ countryName }) {
  const { status, data } = useSelector((state) => state.regions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllData(countryName));

    // reset regions state on unmount
    return () => dispatch(resetRegionsState());
  }, []);

  return (
    <>
      {status !== 'fetched' && (
        <div className="p-8 grid place-content-center">
          {status === 'not fetched' && <>No data fetched yet!</>}
          {status === 'fetching' && <LoadingSpinner />}

          {status === 'failed' && (
            <>Failed in fetching data!</>
          )}

        </div>
      )}

      {status === 'fetched' && data.length === 0 && (
        <div className="p-8 grid place-content-center">No regional data available!</div>
      )}
      {status === 'fetched' && (
        <ul className="flex flex-col">
          {data.map((region, index) => (
            <RegionItem key={region.id} region={region} index={index} />
          ))}
        </ul>
      )}
    </>
  );
}

RegionList.propTypes = {
  countryName: PropTypes.string.isRequired,
};

export default RegionList;
