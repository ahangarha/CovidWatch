import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import regionReducer, { fetchAllData, fetchDataFailure, fetchDataRequest, fetchDataSuccess } from './countries';

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

  it('sets state for successful fetch data action', () => {
    const expectedState = { status: 'fetched', data: 'blah' };

    const newState = regionReducer(initialState, fetchDataSuccess('blah'));

    expect(newState).toEqual(expectedState);
  });

  it('dispatches request and success action on fetchAllData action', () => {
    const store = mockStore(initialState);

    store.dispatch(fetchAllData('2022-01-01'))
      .then(() => {
        expect(store.getActions()).toEqual([
          fetchDataRequest(),
          fetchDataSuccess([{
            id: 'france',
            name: 'France',
            stat: 2356,
          }]),
        ]);
      });
  });
});
