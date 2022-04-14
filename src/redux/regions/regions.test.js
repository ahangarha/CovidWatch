import regionReducer, { fetchDataFailure, fetchDataRequest, resetRegionsState } from './regions';

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
});
