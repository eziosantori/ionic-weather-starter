import { Component } from '@angular/core';

import { Weather } from '../models/weather';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { WeatherService } from '../services/weather/weather.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss']
})
export class CurrentWeatherPage {
  currentWeather: Weather;

  constructor(
    public iconMap: IconMapService,
    private loadingController: LoadingController,
    private weather: WeatherService
  ) {}

  async ionViewDidEnter() {
    const loading = await this.showLoading();
    this.weather.current().subscribe(w => {
      this.currentWeather = w;
      loading.dismiss();
    });
  }

  private async showLoading(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create();
    await loading.present();
    return loading;
  }
}
