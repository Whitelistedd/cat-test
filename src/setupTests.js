import '@testing-library/jest-dom';

// Mock IntersectionObserver which is not available in jsdom
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.IntersectionObserver = MockIntersectionObserver;