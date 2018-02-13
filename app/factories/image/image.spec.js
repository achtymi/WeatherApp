describe('Image Service', () => {
  beforeEach(module('weatherApp'));

  beforeEach(inject($httpBackend => {
    const mockResponse = {
      data: {
        photos: {
          photo: [
            {
              farm: 5,
              id: "39574904682",
              secret: "4076720854",
              server: "4760"
            }
          ]
        }
      }
    };
    $httpBackend.when('GET', 'https://api.flickr.com/services/rest/').respond(mockResponse);
  }));

  it('should return a backdrop url', inject(imageService => {
    const expectedUrl = 'https://farm5.staticflickr.com/4760/39574904682_4076720854.jpg';

    imageService.getBackdrop('Vancouver').then(responseUrl => {
      expect(responseUrl).toEqual(expectedUrl);
      expect(false).toBe(true);
    });
  }));
});