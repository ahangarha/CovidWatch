const FETCH_DATA_REQUEST = 'covidWatch/regions/FETCH_DATA_REQUEST';
const FETCH_DATA_SUCCESS = 'covidWatch/regions/FETCH_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'covidWatch/regions/FETCH_DATA_FAILURE';
const RESET_STATE = 'covidWatch/regions/RESET_STATE';

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: {
    data,
  },
});

export const fetchDataFailure = () => ({
  type: FETCH_DATA_FAILURE,
});

export const resetRegionsState = () => ({
  type: RESET_STATE,
});

const camelCase = (str) => {
  const strArr = str.toLowerCase().split(' ');
  const strArrCamelCase = strArr.map((sa) => sa[0].toUpperCase() + sa.slice(1));
  return strArrCamelCase.join(' ');
};

export const fetchAllData = (countryName) => (dispatch) => {
  const todayDate = (new Date()).toISOString().split('T')[0];
  const API_URL = `https://api.covid19tracking.narrativa.com/api/${todayDate}/country/${countryName}`;

  dispatch(fetchDataRequest());

  fetch(API_URL)
    .then((res) => res.json())
    .then((res) => {
      let data = [];
      const regionsData = res.dates[todayDate].countries[camelCase(countryName)].regions;

      regionsData.forEach(({ id, name, today_new_confirmed: stat }) => {
        data.push({
          id,
          name,
          stat,
        });
      });

      // Only keep data from countries with stat
      // data = data.filter((d) => d.stat > 0);
      // sort based on stat in reverse order
      data = data.sort((a, b) => b.stat - a.stat);
      dispatch(fetchDataSuccess(data));
    })
    .catch((err) => {
      dispatch(fetchDataFailure(err));
    });
};

const initialState = {
  status: 'not fetched',
  data: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, status: 'fetching' };
    case FETCH_DATA_SUCCESS:
      return { data: action.payload.data, status: 'fetched' };
    case FETCH_DATA_FAILURE:
      return { ...state, status: 'failed' };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}
