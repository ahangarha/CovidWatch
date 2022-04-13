import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

function CountryTile({ data }) {
  const { id, name, stat } = data;
  return (
    <Link
      to={`/countries/${id}`}
      className="flex flex-col justify-end aspect-square bg-pink-600 hover:shadow hover:-translate-y-1 p-2 text-right m-2"
    >
      <h2 className="font-bold text-lg uppercase leading-none">
        {name}
      </h2>
      <p>{stat}</p>
    </Link>
  );
}

CountryTile.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    stat: PropTypes.number.isRequired,
  }).isRequired,
};

export default CountryTile;
