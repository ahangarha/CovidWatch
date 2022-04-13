import { PropTypes } from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllData } from '../redux/regions/regions';
import LoadingSpinner from './LoadingSpinner';

function RegionList({ countryName }) {
  const { status, data } = useSelector((state) => state.regions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllData(countryName));
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
          {data.map((region) => (
            <li
              className="flex items-center gap-3 px-2 py-4 even:bg-pink-600"
              key={region.id}
            >
              <p className="grow">{region.name}</p>
              <span>
                {region.stat}
                &nbsp;Cases
              </span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </li>
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
