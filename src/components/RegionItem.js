import { PropTypes } from 'prop-types';
import React from 'react';

function RegionItem({ region }) {
  return (
    <li className="flex items-center gap-3 px-2 py-4 odd:bg-pink-600 text-lg">
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
};

export default RegionItem;
