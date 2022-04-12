import React from 'react';
import { Link } from 'react-router-dom';

function CountryTile() {
  return (
    <Link
      to="/"
      className="flex flex-col justify-end aspect-square border border-pink-600 p-2 text-right"
    >
      <h2 className="font-bold text-lg uppercase">
        Country Name
      </h2>
      <p>135</p>
    </Link>
  );
}

export default CountryTile;
