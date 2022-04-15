import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

function RegionItem({ region, index }) {
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
    <li className={`${classCurrect} transition duration-300 flex items-center gap-3 px-2 py-4 odd:bg-pink-600 text-lg`}>
      <p className="grow">{region.name}</p>
      <span>
        {region.stat}
        &nbsp;Cases
      </span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    </li>
  );
}

RegionItem.propTypes = {
  region: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    stat: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RegionItem;
