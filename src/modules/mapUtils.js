const baseUrl = 'https://mapsvg.com/static/maps/geo-calibrated';

export const normalizeName = (name) => {
  if (name === 'us') return 'usa';
  if (name === 'brunei') return 'brunei-darussalam';
  let result = name;
  result = result.replaceAll('_', '-').replaceAll('*', '');
  if (result === 'bosnia-and-herzegovina') return 'bosnia-herzegovina-2';
  return result;
};

export const getMapUrl = (countryName) => {
  const normalCountryName = normalizeName(countryName);
  return `${baseUrl}/${normalCountryName}.svg`;
};
