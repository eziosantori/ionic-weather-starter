import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Weather } from '../models/weather';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { WeatherService } from '../services/weather/weather.service';
import { WeatherPageBase } from '../weather-page-base/weather-page-base';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentWeatherPage extends WeatherPageBase<Weather> {
  constructor(
    public iconMap: IconMapService,
    loadingController: LoadingController,
    userPreferences: UserPreferencesService,
    weather: WeatherService
  ) {
    super(loadingController, userPreferences, () => weather.current());
  }

  toggleScale() {
    this.scale = this.scale === 'C' ? 'F' : 'C';
    this.userPreferences.setUseCelcius(this.scale === 'C');
  }
}
