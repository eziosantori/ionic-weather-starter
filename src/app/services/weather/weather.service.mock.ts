import { EMPTY } from 'rxjs';

export function createWeatherServiceMock() {
  return {
    current: jest.fn(() => EMPTY),
    forecast: jest.fn(() => EMPTY),
    uvIndex: jest.fn(() => EMPTY)
  };
}
