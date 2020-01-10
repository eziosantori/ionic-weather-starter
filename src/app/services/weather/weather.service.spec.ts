import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { WeatherService } from './weather.service';
import { Weather } from 'src/app/models/weather';
import { Forecast } from '../../models/forecast';
import { UVIndex } from 'src/app/models/uv-index';

const lat = 43.587155;
const lon = 13.528086;

describe('WeatherService', () => {
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: WeatherService = TestBed.get(WeatherService);
    expect(service).toBeTruthy();
  });

  describe('current', () => {

    it('gets data from the server', () => {
      const service: WeatherService = TestBed.get(WeatherService);
      service.current().subscribe();
      const req = httpTestingController.expectOne(
        `${environment.baseUrl}/weather?lat=${environment.baseLat}&lon=${environment.baseLon}&appid=${
          environment.appId
        }`
      );
      expect(req.request.method).toEqual('GET');
      httpTestingController.verify();
    });

    it('transforms the data', () => {
      const service: WeatherService = TestBed.get(WeatherService);
      let weather: Weather;
      service.current().subscribe(w => (weather = w));
      const req = httpTestingController.expectOne(
        `${environment.baseUrl}/weather?lat=${environment.baseLat}&lon=${environment.baseLon}&appid=${
          environment.appId
        }`
      );
      req.flush({
        weather: [
          {
            id: 300
          },
          {
            id: 420
          }
        ],
        main: {
          temp: 280.32
        },
        dt: 1485789600
      });

      httpTestingController.verify();
      expect(weather).toEqual({
        temperature: 280.32,
        condition: 300,
        date: new Date(1485789600 * 1000)
      });
  });

  describe('forecast', () => {
    it('gets the forecast data from the server', () => {
      const service: WeatherService = TestBed.get(WeatherService);
      service.forecast().subscribe();
      const req = httpTestingController.expectOne(
        `${environment.baseUrl}/forecast?lat=${environment.baseLat}&lon=${environment.baseLon}&appid=${
          environment.appId
        }`
      );
      expect(req.request.method).toEqual('GET');
      httpTestingController.verify();
    });

    // it('transforms the data', () => {
    //   const service: WeatherService = TestBed.get(WeatherService);
    //   let forecast: Forecast;
    //   service.forecast().subscribe(f => (forecast = f));
    //   const req = httpTestingController.expectOne(
    //     `${environment.baseUrl}/forecast?lat=43.073051&lon=-89.40123&appid=${
    //       environment.appId
    //     }`
    //   );
    //   req.flush({
    //     list: [
    //       {
    //         dt: 1485799200,
    //         main: {
    //           temp: 283.76
    //         },
    //         weather: [
    //           {
    //             id: 800
    //           }
    //         ]
    //       },
    //       {
    //         dt: 1485810000,
    //         main: {
    //           temp: 282.56
    //         },
    //         weather: [
    //           {
    //             id: 800
    //           }
    //         ]
    //       },
    //       {
    //         dt: 1485820800,
    //         main: {
    //           temp: 282.3
    //         },
    //         weather: [
    //           {
    //             id: 800
    //           }
    //         ]
    //       },
    //       {
    //         dt: 1485896400,
    //         main: {
    //           temp: 280.3
    //         },
    //         weather: [
    //           {
    //             id: 340
    //           }
    //         ]
    //       },
    //       {
    //         dt: 1485907200,
    //         main: {
    //           temp: 279.42
    //         },
    //         weather: [
    //           {
    //             id: 342
    //           }
    //         ]
    //       },
    //     ]
    //   });
    //   httpTestingController.verify();
    //   expect(forecast).toEqual([[
    //     {
    //     temperature: 283.76,
    //     condition: 800,
    //     date: new Date(1485799200 * 1000)
    //   },
    //     {
    //     temperature: 282.56,
    //     condition: 800,
    //     date: new Date(1485810000 * 1000)
    //   },
    //     {
    //     temperature: 282.3,
    //     condition: 800,
    //     date: new Date(1485820800 * 1000)
    //   }
    //   ],
    //   [
    //     {
    //     temperature: 280.3,
    //     condition: 340,
    //     date: new Date(1485896400 * 1000)
    //   },
    //     {
    //     temperature: 279.42,
    //     condition:342,
    //     date: new Date(1485907200 * 1000)
    //   },
    //   ]]);
    // });

  });

  describe('uvi', () => {
    it('gets the data from the server', () => {
      const service: WeatherService = TestBed.get(WeatherService);
      service.uvi().subscribe();
      const req = httpTestingController.expectOne(
        `${environment.baseUrl}/uvi?lat=${environment.baseLat}&lon=${environment.baseLon}&appid=${
          environment.appId
        }`
      );
      expect(req.request.method).toEqual('GET');
      httpTestingController.verify();
    });

    [
      { value: 0, riskLevel: 0 },
      { value: 2.9, riskLevel: 0 },
      { value: 3, riskLevel: 1 },
      { value: 5.9, riskLevel: 1 },
      { value: 6, riskLevel: 2 },
      { value: 7.9, riskLevel: 2 },
      { value: 8, riskLevel: 3 },
      { value: 10.9, riskLevel: 3 },
      { value: 11, riskLevel: 4 },
      { value: 18, riskLevel: 4 }
    ].forEach(test => {
      it(`transforms the data (value: ${test.value})`, () => {
        const service: WeatherService = TestBed.get(WeatherService);
        let uvIndex: UVIndex;
        service.uvi().subscribe(i => (uvIndex = i));

        const req = httpTestingController.expectOne(
          `${environment.baseUrl}/uvi?lat=${environment.baseLat}&lon=${environment.baseLon}&appid=${environment.appId}`
        );
        req.flush({
          value: test.value
        });
        httpTestingController.verify();
        expect(uvIndex).toEqual({
          value: test.value,
          riskLevel: test.riskLevel
        });
      });
    });



  });
  });
});
