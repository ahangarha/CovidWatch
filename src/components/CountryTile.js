import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { getMapUrl } from '../modules/mapUtils';

function CountryTile({ data, index }) {
  const { id, name, stat } = data;
  const imageUrl = getMapUrl(id);

  const classBefore = 'opacity-0 translate-y-4';
  const classAfter = 'opacity-100';
  const [classCurrect, setClassCurrent] = useState(classBefore);

  useEffect(() => {
    setTimeout(() => {
      setClassCurrent(classAfter);
    }, index * 150);
    return () => {
      setClassCurrent(classBefore);
    };
  }, []);

  return (
    <Link
      to={`/countries/${id}`}
      className={`${classCurrect} transition duration-300 flex flex-col justify-end aspect-square bg-pink-600 hover:shadow hover:-translate-y-1 p-2 text-right m-2 relative`}
    >
      <div
        className="absolute inset-2 bottom-8 z-0 opacity-20"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <h2 className="font-bold text-2xl uppercase leading-none z-10">
        {name}
      </h2>
      <p className="text-lg z-10">{stat}</p>
    </Link>
  );
}

CountryTile.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    stat: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CountryTile;
