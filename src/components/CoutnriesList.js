import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllData } from '../redux/countries/countries';
import CountryTile from './CountryTile';
import LoadingSpinner from './LoadingSpinner';

function CoutnriesList() {
  const { status, data } = useSelector((state) => state.countries);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'not fetched') dispatch(fetchAllData());
  }, []);

  return (
    <>
      {status === 'not fetched' && <div>Nothing fetched yet</div>}
      {status === 'fetching' && <LoadingSpinner />}
      {status === 'fetched' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {data.map((countryData) => (
            <CountryTile
              key={countryData.id}
              data={countryData}
            />
          ))}
        </div>
      )}
      {status === 'failed' && <div>Failed in fetching data!</div>}
    </>
  );
}

export default CoutnriesList;
