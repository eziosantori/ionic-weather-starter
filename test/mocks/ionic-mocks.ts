import { jsxAttribute } from '@babel/types';

export function createNavControllerMock() {
  return {
    goBack: jest.fn(() => undefined),
    navigateForward: jest.fn(() => undefined),
    navigateRoot: jest.fn(() => undefined)
  };
}

export function createOverlayElementMock(name: string) {
  return {
    dismiss: jest.fn(() => Promise.resolve()),
    onDidDismiss: jest.fn(() => Promise.resolve()),
    onWillDismiss: jest.fn(() => Promise.resolve()),
    present: jest.fn(() => Promise.resolve())
  };
}

export function createOverlayControllerMock(name: string, element?: any) {
  return {
    create: jest.fn(() => Promise.resolve(element)),
    dismiss: jest.fn(() => undefined),
    getTop: jest.fn(() => Promise.resolve(element))
  };
}

export function createPlatformMock() {
  return {
    is: jest.fn(() => false),
    ready: jest.fn(() => Promise.resolve())
  };
}
