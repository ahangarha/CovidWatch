import React from 'react';
import CountriesList from '../components/CountriesList';

function AllCountries() {
  return (
    <main className="container mx-auto flex flex-col grow">
      <div className="h-48 grid place-content-center">
        Global Statistics
      </div>
      <div className="bg-pink-500 grow rounded-t-3xl border-t border-t-pink-600">
        <div className="p-2 text-center uppercase font-bold">State by countries</div>
        <CountriesList />
      </div>
    </main>
  );
}

export default AllCountries;
