import React from 'react';
import CoutnriesList from '../components/CoutnriesList';

function AllCountries() {
  return (
    <main className="container mx-auto">
      <div className="h-48">
        Global Statistics
      </div>
      <div className="p-1">State by countries</div>
      <CoutnriesList />
    </main>
  );
}

export default AllCountries;
