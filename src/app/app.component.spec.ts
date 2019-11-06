import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

import { createPlatformMock } from '../../test/mocks';

describe('AppComponent', () => {
  let statusBar;
  let splashScreen;

  beforeEach(async(() => {
    splashScreen = {hide: jest.fn()};
    statusBar = {
      backgroundColorByHexString: jest.fn(),
      styleLightContent: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBar },
        { provide: SplashScreen, useValue: splashScreen },
        { provide: Platform, useFactory: createPlatformMock }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('initialization', () => {
    it('waits for the platform to be ready', () => {
      const platform = TestBed.get(Platform);
      TestBed.createComponent(AppComponent);
      expect(platform.ready).toHaveBeenCalledTimes(1);
    });

    it('sets the default status bar style when ready', async () => {
      const platform = TestBed.get(Platform);
      TestBed.createComponent(AppComponent);
      expect(statusBar.styleLightContent).not.toHaveBeenCalled();
      await platform.ready();
      expect(statusBar.styleLightContent).toHaveBeenCalledTimes(1);
    });

    it('hides the splash screen when ready', async () => {
      const platform = TestBed.get(Platform);
      TestBed.createComponent(AppComponent);
      expect(splashScreen.hide).not.toHaveBeenCalled();
      await platform.ready();
      expect(splashScreen.hide).toHaveBeenCalledTimes(1);
    });

    it('does not set the status bar background by default', async () => {
      const platform = TestBed.get(Platform);
      TestBed.createComponent(AppComponent);
      expect(statusBar.backgroundColorByHexString).not.toHaveBeenCalled();
      await platform.ready();
      expect(statusBar.backgroundColorByHexString).not.toHaveBeenCalled();
    });

    it('sets the status bar background for Android', async () => {
      const platform = TestBed.get(Platform);
      platform.is.mockReturnValue(true);
      TestBed.createComponent(AppComponent);
      expect(statusBar.backgroundColorByHexString).not.toHaveBeenCalled();
      await platform.ready();
      expect(platform.is).toHaveBeenCalledTimes(1);
      expect(platform.is).toHaveBeenCalledWith('android');
      expect(statusBar.backgroundColorByHexString).toHaveBeenCalledTimes(1);
      expect(statusBar.backgroundColorByHexString).toHaveBeenCalledWith('#074f8b');
    });
  });
});
