import { getMapUrl } from './mapUtils';

describe('Get map URL', () => {
  const baseURl = 'BASE_URL';

  test('should get correct url for us', () => {
    const expectedUrl = `${baseURl}/usa.svg`;

    const imageUrl = getMapUrl('us', baseURl);

    expect(imageUrl).toBe(expectedUrl);
  });
});
