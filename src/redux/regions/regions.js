const FETCH_DATA_REQUEST = 'covidWatch/regions/FETCH_DATA_REQUEST';
const FETCH_DATA_SUCCESS = 'covidWatch/regions/FETCH_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'covidWatch/regions/FETCH_DATA_FAILURE';
const RESET_STAT = 'covidWatch/regions/RESET_STAT';

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (meta, data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: {
    meta,
    data,
  },
});

export const fetchDataFailure = (err = '') => ({
  type: FETCH_DATA_FAILURE,
  payload: {
    err,
  },
});

export const resetRegionsState = () => ({
  type: RESET_STAT,
});

const camelCase = (str) => {
  if (str === 'us') return 'US';
  const strArr = str.toLowerCase().split(' ');
  const strArrCamelCase = strArr.map((sa) => sa[0].toUpperCase() + sa.slice(1));
  return strArrCamelCase.join(' ');
};

const todayDate = (new Date()).toISOString().split('T')[0];

export const fetchAllData = (countryName, date = todayDate) => (dispatch) => {
  const API_URL = `https://api.covid19tracking.narrativa.com/api/${date}/country/${countryName}`;

  dispatch(fetchDataRequest());
  return fetch(API_URL)
    .then((res) => res.json())
    .then((res) => {
      const countryData = res.dates[date].countries[camelCase(countryName)];
      const meta = {
        stat: countryData.today_new_confirmed,
      };
      let data = [];
      const regionsData = countryData.regions;
      regionsData.forEach(({ id, name, today_new_confirmed: stat }) => {
        data.push({
          id,
          name,
          stat,
        });
      });

      // sort based on stat in reverse order
      data = data.sort((a, b) => b.stat - a.stat);
      dispatch(fetchDataSuccess(meta, data));
    })
    .catch((err) => {
      dispatch(fetchDataFailure(err));
    });
};

const initialState = {
  status: 'not fetched',
  meta: { stat: -1 },
  data: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, status: 'fetching' };
    case FETCH_DATA_SUCCESS:
      return { meta: action.payload.meta, data: action.payload.data, status: 'fetched' };
    case FETCH_DATA_FAILURE:
      return { ...state, status: 'failed' };
    case RESET_STAT:
      return initialState;
    default:
      return state;
  }
}
