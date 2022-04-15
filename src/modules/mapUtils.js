const baseUrlFallback = 'https://mapsvg.com/static/maps/geo-calibrated';

export const normalizeName = (name) => {
  if (name === 'us') return 'usa';
  if (name === 'korea,_south') return 'south-korea';
  if (name === 'brunei') return 'brunei-darussalam';
  let result = name;
  result = result.replace(/_/, '-').replace(/\*/g, '');
  if (result === 'bosnia-and-herzegovina') return 'bosnia-herzegovina-2';
  return result;
};

export const getMapUrl = (countryName, baseUrl = baseUrlFallback) => {
  const normalCountryName = normalizeName(countryName);
  return `${baseUrl}/${normalCountryName}.svg`;
};
