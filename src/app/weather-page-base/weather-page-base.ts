import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

export class WeatherPageBase<T> {
  data: T;

  constructor(
    private loadingController: LoadingController,
    private fetch: () => Observable<T>
  ) {}

  async ionViewDidEnter() {
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
