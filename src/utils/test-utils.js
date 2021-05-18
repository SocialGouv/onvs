// see https://github.com/vercel/next.js/issues/7479#issuecomment-659859682
export const mockRouterImplementation = {
  asPath: "/",
  back: jest.fn(() => Promise.resolve(true)),
  basePath: "/",
  beforePopState: jest.fn(() => Promise.resolve(true)),
  events: {
    emit: jest.fn(),
    off: jest.fn(),
    on: jest.fn(),
  },
  isFallback: false,
  pathname: "/",
  prefetch: jest.fn(() => Promise.resolve()),
  push: jest.fn(() => Promise.resolve(true)),
  query: {},
  reload: jest.fn(() => Promise.resolve(true)),
  replace: jest.fn(() => Promise.resolve(true)),
  route: "/",
};
