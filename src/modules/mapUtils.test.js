import { getMapUrl } from './mapUtils';

describe('Get map URL', () => {
  const baseURl = 'BASE_URL';

  it('should get correct url for us', () => {
    const expectedUrl = `${baseURl}/usa.svg`;

    const imageUrl = getMapUrl('us', baseURl);

    expect(imageUrl).toBe(expectedUrl);
  });

  it('gives correct url for south korea', () => {
    const expectedUrl = `${baseURl}/south-korea.svg`;

    const imageUrl = getMapUrl('korea,_south', baseURl);

    expect(imageUrl).toBe(expectedUrl);
  });

  it('gives correct url for a_b*c', () => {
    const expectedUrl = `${baseURl}/a-bc.svg`;

    const imageUrl = getMapUrl('a_b*c', baseURl);

    expect(imageUrl).toBe(expectedUrl);
  });
});
