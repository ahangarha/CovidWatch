import regionReducer, { fetchDataFailure, fetchDataRequest } from './countries';

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
});
