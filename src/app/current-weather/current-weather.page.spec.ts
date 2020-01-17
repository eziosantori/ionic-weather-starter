import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, LoadingController } from '@ionic/angular';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { CurrentWeatherPage } from './current-weather.page';
import { WeatherService } from '../services/weather/weather.service';
import { createWeatherServiceMock } from '../services/weather/weather.service.mock';
import { createOverlayControllerMock, createOverlayElementMock } from 'test/mocks';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';
import { createUserPreferencesServiceMock } from '../services/user-preferences/user-preferences.service.mock';

describe('CurrentWeatherPage', () => {
  let component: CurrentWeatherPage;
  let fixture: ComponentFixture<CurrentWeatherPage>;
  let loading;

  beforeEach(async(() => {
    loading = createOverlayElementMock('Loading');
    TestBed.configureTestingModule({
      declarations: [CurrentWeatherPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: WeatherService, useFactory: createWeatherServiceMock },
        { provide: UserPreferencesService, useFactory: createUserPreferencesServiceMock },
        { provide: LoadingController, useFactory: () =>
          createOverlayControllerMock('LoadingController', loading)
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentWeatherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('entering the page', () => {
    it('displays a loading indicator', async () => {
      const loadingController = TestBed.get(LoadingController);
      await component.ionViewDidEnter();
      expect(loadingController.create).toHaveBeenCalledTimes(1);
      expect(loading.present).toHaveBeenCalledTimes(1);
    });

    it('gets the current weather', async () => {
      const weather = TestBed.get(WeatherService);
      await component.ionViewDidEnter();
      expect(weather.current).toHaveBeenCalledTimes(1);
    });

    it('displays the current weather', async () => {
      const weather = TestBed.get(WeatherService);
      weather.current.and.returnValue(
        of({
          temperature: 280.32,
          condition: 300,
          date: new Date(1485789600 * 1000)
        })
      );
      await component.ionViewDidEnter();
      fixture.detectChanges();
      await new Promise(resolve => setTimeout(() => resolve()));
      const t = fixture.debugElement.query(By.css('kws-temperature'));
      expect(t).toBeTruthy();
    });

    it('dismisses the loading indicator', async () => {
      const weather = TestBed.get(WeatherService);
      weather.current.and.returnValue(
        of({
          temperature: 280.32,
          condition: 300,
          date: new Date(1485789600 * 1000)
        })
      );
      await component.ionViewDidEnter();
      expect(loading.dismiss).toHaveBeenCalledTimes(1);
    });
  });


  describe('toggling the scale', () => {
    it('toggles from "C" to "F"', () => {
      component.scale = 'C';
      component.toggleScale();
      expect(component.scale).toEqual('F');
    });

    it('sets the preference false when toggling from "C" to "F"', () => {
      const userPreferences = TestBed.get(UserPreferencesService);
      component.scale = 'C';
      component.toggleScale();
      expect(userPreferences.setUseCelcius).toHaveBeenCalledTimes(1);
      expect(userPreferences.setUseCelcius).toHaveBeenCalledWith(false);
    });

    it('toggles from "F" to "C"', () => {
      component.scale = 'F';
      component.toggleScale();
      expect(component.scale).toEqual('C');
    });

    it('sets the preference true when toggling from "F" to "C"', () => {
      const userPreferences = TestBed.get(UserPreferencesService);
      component.scale = 'F';
      component.toggleScale();
      expect(userPreferences.setUseCelcius).toHaveBeenCalledTimes(1);
      expect(userPreferences.setUseCelcius).toHaveBeenCalledWith(true);
    });
  });

});
