export function createUserPreferencesServiceMock() {
  return {
    getUseCelcius: jest.fn(() => Promise.resolve()),
    setUseCelcius: jest.fn(() => Promise.resolve())
  };
}
