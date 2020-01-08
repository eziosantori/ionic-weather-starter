import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { createPlatformMock } from '../../test/mocks';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let statusBar, splashScreen, platformReadySpy, platformSpy;

  beforeEach(async(() => {
    statusBar = jasmine.createSpyObj('StatusBar', ['styleLightContent', 'backgroundColorByHexString']);
    splashScreen = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBar },
        { provide: SplashScreen, useValue: splashScreen },
        // { provide: Platform, useValue: platformSpy },
        { provide: Platform, useFactory: createPlatformMock },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it('should initialize the app', async () => {
  //   TestBed.createComponent(AppComponent);
  //   expect(platformSpy.ready).toHaveBeenCalled();
  //   await platformReadySpy;
  //   expect(statusBar.styleDefault).toHaveBeenCalled();
  //   expect(splashScreen.hide).toHaveBeenCalled();
  // });
  it('should initialize the app', async () => {
    const platform = TestBed.get(Platform);
    TestBed.createComponent(AppComponent);
    expect(platform.ready).toHaveBeenCalled();
    await platform.ready();
    expect(statusBar.styleLightContent).toHaveBeenCalled();
    expect(splashScreen.hide).toHaveBeenCalled();
  });

  it('does not set the background color by default', async () => {
    const platform = TestBed.get(Platform);
    TestBed.createComponent(AppComponent);
    expect(statusBar.backgroundColorByHexString).not.toHaveBeenCalled();
    await platform.ready();
    expect(statusBar.backgroundColorByHexString).not.toHaveBeenCalled();
  });

  it('sets the light content status bar style when ready', async () => {
    const platform = TestBed.get(Platform);
    TestBed.createComponent(AppComponent);
    expect(statusBar.styleLightContent).not.toHaveBeenCalled();
    await platform.ready();
    expect(statusBar.styleLightContent).toHaveBeenCalledTimes(1);
  });

  it('sets the background color if the current platform is android', async () => {
    const platform = TestBed.get(Platform);
    platform.is.withArgs('android').and.returnValue(true);
    TestBed.createComponent(AppComponent);
    expect(statusBar.backgroundColorByHexString).not.toHaveBeenCalled();
    await platform.ready();
    expect(statusBar.backgroundColorByHexString).toHaveBeenCalledTimes(1);
    expect(statusBar.backgroundColorByHexString).toHaveBeenCalledWith('#074f8b');
  });
});
