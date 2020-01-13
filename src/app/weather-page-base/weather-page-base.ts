import { LoadingController } from "@ionic/angular";
import { Observable } from "rxjs";

export class WeatherPageBase<T> {
    data: T;

  constructor(
    public loadingController: LoadingController,
    public fetch: () => Observable<T>
    ) { }

    async ionViewDidEnter() {
      // this.weather.current().subscribe(w => (this.currentWeather = w));
      const l = await this.loadingController.create();
      l.present();
      this.fetch().subscribe(d => {
        this.data = d;
        l.dismiss();
      });
    }
}
