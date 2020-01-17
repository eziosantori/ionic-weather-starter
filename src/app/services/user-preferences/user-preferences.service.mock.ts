
export function createUserPreferencesServiceMock() {
  return jasmine.createSpyObj('UserPreferencesService', {
    getUseCelcius: Promise.resolve(),
    setUseCelcius: Promise.resolve()
  });
}
export function createIonicStorageMock() {
  return jasmine.createSpyObj('Storage', {
    get: Promise.resolve(),
    set: Promise.resolve(),
    ready: Promise.resolve()
  });
}