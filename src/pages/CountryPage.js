import React from 'react';
import { useParams } from 'react-router-dom';
import RegionList from '../components/RegionList';

function CountryPage() {
  let { countryName } = useParams();

  countryName = countryName.replaceAll('_', ' ');

  return (
    <>
      <div className="h-48">
        Statistics for&nbsp;
        {countryName}
      </div>
      <div className="p-1 bg-pink-500">Region/State/City</div>
      <RegionList countryName={countryName.toLowerCase()} />
    </>
  );
}

export default CountryPage;
