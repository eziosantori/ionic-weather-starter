import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Forecast } from '../models/forecast';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { WeatherService } from '../services/weather/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss']
})
export class ForecastPage {
  forecast: Forecast;

  constructor(
    public iconMap: IconMapService,
    private loadingController: LoadingController,
    private weather: WeatherService
  ) {}

  async ionViewDidEnter() {
    const loading = await this.showLoading();
    this.weather.forecast().subscribe(f => {
      this.forecast = f;
      loading.dismiss();
    });
  }

  private async showLoading(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create();
    await loading.present();
    return loading;
  }
}
