import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Weather } from 'src/app/models/weather';
import { Forecast } from '../../models/forecast';
import { UVIndex } from 'src/app/models/uv-index';
  import { LocationService } from '../location/location.service';
import { Coordinate } from 'src/app/models/cordinate';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // ANCONA
  private latitude = environment.baseLat;
  private longitude = environment.baseLon;
  // CUPRA
  // private latitude = 43.021818;
  // private longitude = 13.857440;

  constructor(
    private http: HttpClient,
    private location: LocationService) {}

  public current(): Observable<Weather> {
    return this.currentLocation().pipe(flatMap(coords => this.getCurrent(coords)));
  }
  public forecast(): Observable<Forecast> {
    return this.currentLocation().pipe(flatMap(coords => this.getForecast(coords)));
  }

  public uvi(): Observable<UVIndex> {
    return this.currentLocation().pipe(flatMap(coords => this.getUvi(coords)));
  }
  private getCurrent(coords: Coordinate): Observable<Weather> {
    return this.http
    .get(
      `${environment.baseUrl}/weather?lat=${coords.latitude}&lon=${
        coords.longitude
      }&appid=${environment.appId}`
    )
    .pipe(map(res => this.unpackWeather(res)));
  }
  private getForecast(coords: Coordinate): Observable<Forecast> {
    return this.http
    .get(
      `${environment.baseUrl}/forecast?lat=${coords.latitude}&lon=${
        coords.longitude
      }&appid=${environment.appId}`
    )
    .pipe(map(res => this.unpackForecast(res)));
  }
  private getUvi(coords: Coordinate): Observable<UVIndex> {
    return this.http
    .get(
      `${environment.baseUrl}/uvi?lat=${coords.latitude}&lon=${
        coords.longitude
      }&appid=${environment.appId}`
    )
    .pipe(map(res => this.unpackUvIndex(res)));
  }
  private currentLocation(): Observable<Coordinate> {
    return from( this.location.current());
  }
  private unpackWeather(res: any): Weather {
    return {
      temperature: res.main.temp,
      condition: res.weather[0].id,
      date: res.dt && new Date(res.dt * 1000)
    };
  }
  private unpackForecast(res: any): Forecast {
    let currentDay: Array<Weather>;
    let prevDate: number;
    const forecast: Forecast = [];

    res.list.forEach(item => {
      const w = this.unpackWeather(item);
      if (w.date.getDate() !== prevDate) {
        prevDate = w.date.getDate();
        currentDay = [];
        forecast.push(currentDay);
      }
      currentDay.push(w);
    });

    return forecast;
  }
  private unpackUvIndex(res: any): UVIndex {
    return {
      value: res.value,
      riskLevel: this.riskLevel(res.value)
    };
  }
  private riskLevel(value: number): number {
    if (value < 3) {
      return 0;
    }
    if (value < 6) {
      return 1;
    }
    if (value < 8) {
      return 2;
    }
    if (value < 11) {
      return 3;
    }
    return 4;
  }
}
