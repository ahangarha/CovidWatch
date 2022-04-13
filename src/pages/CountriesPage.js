import React from 'react';
import CountriesList from '../components/CountriesList';

function AllCountries() {
  return (
    <main className="container mx-auto">
      <div className="h-48">
        Global Statistics
      </div>
      <div className="p-1">State by countries</div>
      <CountriesList />
    </main>
  );
}

export default AllCountries;
