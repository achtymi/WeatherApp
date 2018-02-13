describe('Weather Service', () => {
  beforeEach(module('weatherApp'));

  beforeEach(inject($httpBackend => {
    const mockResponse = {
      data: {
        list: [
          { dt: 1517331600,
            temp: {
              max: 290.51,
              min: 289.15
            },
            weather: [{main: 'Clouds'}]
          },
          { dt: 1517418000,
            temp: {
              max: 296.07,
              min: 292.89
            },
            weather: [{main: 'Sunny'}]
          },
          { dt: 1517504400,
            temp: {
              max: 297.37,
              min: 296.14
            },
            weather: [{main: 'Rainy'}]
          }
        ]
      }
    };
    $httpBackend.when('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily/').respond(mockResponse);
  }));

  it('should return a list of weather data', inject(weatherService => {
    const expectedWeather = [
      { date: 'Tuesday',
        desc: 'Clouds',
        max: 17,
        min: 16
      },
      { date: 'Wednesday',
        desc: 'Sunny',
        max: 23,
        min: 20
      },
      { date: 'Thursday',
        desc: 'Rainy',
        max: 24,
        min: 23
      }
    ];

    weatherService.getWeather('Vancouver').then(responseWeather => {
      console.log(responseWeather);
      expect(responseWeather).toEqual(expectedWeather);
    });
  }));
});