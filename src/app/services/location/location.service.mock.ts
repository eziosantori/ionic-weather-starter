export function createLocationServiceMock() {
  return {
    current: jest.fn(() => Promise.resolve())
  };
}
