import React, { useState, useEffect } from 'react';
import CountriesList from '../components/CountriesList';
import { getMapUrl } from '../modules/mapUtils';

function AllCountries() {
  const imageUrl = getMapUrl('world');
  const classBefore = 'opacity-0 translate-y-8';
  const classAfter = 'opacity-100';
  const [classCurrect, setClassCurrent] = useState(classBefore);
  const [searchTerm, setSearchTerm] = useState('');

  const updateSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setClassCurrent(classAfter);
    return () => {
      setClassCurrent(classBefore);
    };
  }, []);

  return (
    <main className={`container mx-auto flex flex-col grow transition-all duration-500 ${classCurrect}`}>
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
        <div className="z-10 flex flex-col gap-2">
          <h2 className="text-center text-3xl">
            Daily statistics of confirmed
            <br />
            Covid-19 cases
          </h2>
          <p className="text-xs inline-block bg-black/10 font-bold">
            Source: John Hopkins University
          </p>

          <input
            type="text"
            name="search"
            value={searchTerm}
            onChange={updateSearchTerm}
            className="p-2 pb-1 placeholder:text-white/50 text-center leading-none border bg-transparent rounded-xl uppercase"
            placeholder="Filter Countries"
          />
        </div>
      </div>
      <div className="bg-pink-500 grow rounded-3xl border border-pink-600">
        <div className="p-2 text-center uppercase font-bold">Stat by countries</div>
        <CountriesList searchTerm={searchTerm} />
        <div className="h-4" />
      </div>
    </main>
  );
}

export default AllCountries;
