import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';

export class WeatherPageBase<T> {
    data: T;
    scale: string;

  constructor(
    private loadingController: LoadingController,
    protected userPreferences: UserPreferencesService,
    private fetch: () => Observable<T>
    ) { }

    async ionViewDidEnter() {
      // this.weather.current().subscribe(w => (this.currentWeather = w));
      const l = await this.loadingController.create();
      this.scale = (await this.userPreferences.getUseCelcius()) ? 'C' : 'F';

      l.present();
      this.fetch().subscribe(d => {
        this.data = d;
        l.dismiss();
      });
    }
}
