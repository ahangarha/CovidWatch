import React from 'react';
import { useParams } from 'react-router-dom';
import RegionList from '../components/RegionList';

function CountryPage() {
  let { countryName } = useParams();

  countryName = countryName.replaceAll('_', ' ');

  return (
    <main className="container mx-auto flex flex-col grow">
      <div className="h-48 grid place-content-center">
        Statistics for&nbsp;
        {countryName}
      </div>
      <div className="bg-pink-500 grow rounded-t-3xl border-t border-t-pink-600">
        <div className="p-2 text-center uppercase font-bold">Region/State/City</div>
        <RegionList countryName={countryName.toLowerCase()} />
      </div>
    </main>
  );
}

export default CountryPage;
