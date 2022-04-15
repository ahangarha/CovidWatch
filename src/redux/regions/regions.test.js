import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import regionReducer, {
  fetchAllData,
  fetchDataFailure,
  fetchDataRequest,
  fetchDataSuccess,
  resetRegionsState,
} from './regions';

global.fetch = () => Promise.resolve({
  json: () => Promise.resolve({
    dates: {
      '2022-01-01': {
        countries: {
          France: {
            date: '2022-01-01',
            id: 'france',
            name: 'France',
            regions: [
              {
                date: '2022-01-01',
                id: 'martinique',
                name: 'Martinique',
                today_new_confirmed: 284,
                today_new_deaths: 0,
              },
            ],
            today_new_confirmed: 2356,
            today_new_deaths: 33,
          },
        },
        info: {
          date: '2022-01-01 00:00CEST',
        },
      },
    },
    metadata: {
      by: 'Narrativa & AppliedXL',
    },
    total: {
      name: 'Total',
      today_new_confirmed: 676208,
      today_new_deaths: 3621,
    },
    updated_at: '2022-04-14 12:36UTC',
  }),
});

const mockStore = configureMockStore([thunk]);

describe('Test for region reducer', () => {
  const initialState = {
    status: 'not fetched',
    meta: { stat: -1 },
    data: [],
  };

  it('make initial state', () => {
    const expectedState = { ...initialState };

    const newState = regionReducer(undefined, {});

    expect(newState).toEqual(expectedState);
  });

  it('sets status to fetching for fetch data action', () => {
    const expectedState = { ...initialState, status: 'fetching' };

    const newState = regionReducer(initialState, fetchDataRequest());

    expect(newState).toEqual(expectedState);
  });

  it('sets state to success', () => {
    const currentState = initialState;
    const expectedState = {
      status: 'fetched',
      meta: { stat: 100 },
      data: [{
        name: 'blah',
      }],
    };

    const newState = regionReducer(
      currentState,
      fetchDataSuccess(
        { stat: 100 },
        [{
          name: 'blah',
        }],
      ),
    );

    expect(newState).toEqual(expectedState);
  });

  it('sets status to failed on failing to fetch data', () => {
    const currentState = {
      status: 'fetching',
      data: [1, 2],
      meta: { stat: 0 },
    };
    const expectedState = { ...currentState, status: 'failed' };

    const newState = regionReducer(currentState, fetchDataFailure());

    expect(newState).toEqual(expectedState);
  });

  it('resets state on call for resetRegionsState action', () => {
    const currentState = 'blah';
    const expectedState = { ...initialState };

    const newState = regionReducer(currentState, resetRegionsState());

    expect(newState).toEqual(expectedState);
  });

  it('dispatches other actions on fetching all data', () => {
    const store = mockStore(initialState);
    const expectedMeta = { stat: 2356 };
    const expectedData = [
      {
        id: 'martinique',
        name: 'Martinique',
        stat: 284,
      },
    ];

    store.dispatch(fetchAllData('france', '2022-01-01'))
      .then(() => {
        expect(store.getActions()).toEqual([
          fetchDataRequest(),
          fetchDataSuccess(
            expectedMeta,
            expectedData,
          ),
        ]);
      });
  });
});
