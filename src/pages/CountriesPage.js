import React from 'react';
import CountriesList from '../components/CountriesList';
import { getMapUrl } from '../modules/mapUtils';

function AllCountries() {
  const imageUrl = getMapUrl('world');

  return (
    <main className="container mx-auto flex flex-col grow">
      <div className="h-48 md:h-64 grid place-content-center relative text-center">
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
        <h2 className="z-10 text-center text-3xl">
          Daily statistics of confirmed
          <br />
          Covid-19 cases
        </h2>
        <p className="text-xs inline-block bg-black/10 font-bold">
          Source: John Hopkins University
        </p>
      </div>
      <div className="bg-pink-500 grow rounded-3xl border border-pink-600">
        <div className="p-2 text-center uppercase font-bold">Stat by countries</div>
        <CountriesList />
        <div className="h-4" />
      </div>
    </main>
  );
}

export default AllCountries;
