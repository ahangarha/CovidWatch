import React from 'react';
import { useParams } from 'react-router-dom';

function CountryPage() {
  const { countryName } = useParams();

  return (
    <>
      <div className="h-48">
        Statistics for&nbsp;
        {countryName}
      </div>
      <div className="p-1 bg-pink-500">Region/State/City</div>
      <ul className="flex flex-col">
        {[0, 1, 2, 3, 4].map((index) => (
          <li
            className="flex items-center gap-3 px-2 py-4 even:bg-pink-600"
            key={index}
          >
            <p className="grow">Name</p>
            <span>
              123 Cases
            </span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CountryPage;
