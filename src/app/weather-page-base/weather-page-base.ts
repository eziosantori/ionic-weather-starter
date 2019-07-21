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
  ) {}

  async ionViewDidEnter() {
    this.scale = await this.userPreferences.getUseCelcius() ? 'C' : 'F';
    const loading = await this.showLoading();
    this.fetch().subscribe(d => {
      this.data = d;
      loading.dismiss();
    });
  }

  private async showLoading(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create();
    await loading.present();
    return loading;
  }
}
