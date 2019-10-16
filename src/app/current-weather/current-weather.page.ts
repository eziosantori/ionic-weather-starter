import { Component } from '@angular/core';
import { Weather } from '../models/weather';
import { IconMapService } from '../services/icon-map/icon-map.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss']
})
export class CurrentWeatherPage {
  currentWeather: Weather = {
    temperature: 302,
    condition: 200
  };

  constructor(public iconMap: IconMapService) { }
}
