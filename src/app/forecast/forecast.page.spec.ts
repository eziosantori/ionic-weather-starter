import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { ForecastPage } from './forecast.page';
import { WeatherService } from '../services/weather/weather.service';
import { createWeatherServiceMock } from '../services/weather/weather.service.mock';
import { LoadingController } from '@ionic/angular';
import { createOverlayControllerMock, createOverlayElementMock } from '../../../test/mocks';

describe('ForecastPage', () => {
  let component: ForecastPage;
  let fixture: ComponentFixture<ForecastPage>;
  let loading;

  beforeEach(async(() => {
    loading = createOverlayElementMock('Loading');
    TestBed.configureTestingModule({
      declarations: [ForecastPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: LoadingController,
          useFactory: () => createOverlayControllerMock('LoadingController', loading)
        },
        { provide: WeatherService, useFactory: createWeatherServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('entering the page', () => {
    beforeEach(() => {
      const weather = TestBed.get(WeatherService);
      weather.forecast.and.returnValue(
        of([
          [
            {
              temperature: 300,
              condition: 200,
              date: new Date(2018, 8, 19)
            }
          ],
          [
            {
              temperature: 265,
              condition: 601,
              date: new Date(2018, 8, 20)
            }
          ],
          [
            {
              temperature: 293,
              condition: 800,
              date: new Date(2018, 8, 21)
            }
          ]
        ])
      );
    });

    it('displays a loading indicator', async () => {
      const loadingController = TestBed.get(LoadingController);
      await component.ionViewDidEnter();
      expect(loadingController.create).toHaveBeenCalledTimes(1);
      expect(loading.present).toHaveBeenCalledTimes(1);
    });

    it('gets the forecast', async () => {
      const weather = TestBed.get(WeatherService);
      await component.ionViewDidEnter();
      expect(weather.forecast).toHaveBeenCalledTimes(1);
    });

    it('shows the forecast items', async () => {
      await component.ionViewDidEnter();
      fixture.detectChanges();
      const f = fixture.debugElement.queryAll(By.css('kws-daily-forecast'));
      expect(f.length).toEqual(3);
    });

    it('dismisses the loading indicator', async () => {
      await component.ionViewDidEnter();
      expect(loading.dismiss).toHaveBeenCalledTimes(1);
    });
  });
});
