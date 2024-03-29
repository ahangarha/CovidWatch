const FETCH_DATA_REQUEST = 'covidWatch/countries/FETCH_DATA_REQUEST';
const FETCH_DATA_SUCCESS = 'covidWatch/countries/FETCH_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'covidWatch/countries/FETCH_DATA_FAILURE';

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: {
    data,
  },
});

export const fetchDataFailure = (err = '') => ({
  type: FETCH_DATA_FAILURE,
  payload: {
    err,
  },
});

const todayDate = (new Date()).toISOString().split('T')[0];

export const fetchAllData = (date = todayDate) => (dispatch) => {
  const API_URL = `https://api.covid19tracking.narrativa.com/api/${date}`;
  dispatch(fetchDataRequest());

  return fetch(API_URL)
    .then((res) => res.json())
    .then((res) => {
      let data = [];
      const countriesData = res.dates[date].countries;

      Object.keys(countriesData).forEach((country) => {
        data.push({
          id: countriesData[country].id,
          name: countriesData[country].name,
          stat: countriesData[country].today_new_confirmed,
        });
      });

      // Only keep data from countries with stat
      data = data.filter((d) => d.stat > 0);
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
    default:
      return state;
  }
}
