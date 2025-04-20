import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import App from './App';

vi.mock('axios');

describe('App Component', () => {
  const mockCatImage = { url: 'https://example.com/cat.jpg' };

  beforeEach(() => {
    vi.clearAllMocks();
    axios.get.mockResolvedValue({ data: [mockCatImage] });
  });

  it('renders all components correctly', () => {
    render(<App />);
    expect(screen.getByLabelText('Enabled')).toBeInTheDocument();
    expect(screen.getByLabelText('Auto-refresh every 5 second')).toBeInTheDocument();
    expect(screen.getByText('Get cat')).toBeInTheDocument();
  });

  it('fetches cat image on initial render', async () => {
    render(<App />);
    expect(axios.get).toHaveBeenCalledWith('https://api.thecatapi.com/v1/images/search');
    await waitFor(() => {
      expect(screen.getByAltText('Random cat')).toHaveAttribute('src', mockCatImage.url);
    });
  });

  it('fetches new image when button is clicked', async () => {
    render(<App />);
    const button = screen.getByText('Get cat');

    axios.get.mockClear();
    
    fireEvent.click(button);
    expect(axios.get).toHaveBeenCalledWith('https://api.thecatapi.com/v1/images/search');
  });

  it('disables fetching when enabled is false', async () => {
    render(<App />);
    const enabledCheckbox = screen.getByLabelText('Enabled');
    const button = screen.getByText('Get cat');

    fireEvent.click(enabledCheckbox);
    expect(button).toBeDisabled();

    axios.get.mockClear();
    
    fireEvent.click(button);
    expect(axios.get).not.toHaveBeenCalled();
  });

  it('starts auto-refresh when enabled', async () => {
    vi.useFakeTimers();
    render(<App />);
    
    const autoRefreshCheckbox = screen.getByLabelText('Auto-refresh every 5 second');
    fireEvent.click(autoRefreshCheckbox);

    axios.get.mockClear();
    
    vi.advanceTimersByTime(5000);
    expect(axios.get).toHaveBeenCalledWith('https://api.thecatapi.com/v1/images/search');

    vi.advanceTimersByTime(5000);
    expect(axios.get).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });

  it('stops auto-refresh when disabled', async () => {
    vi.useFakeTimers();
    render(<App />);
    
    const autoRefreshCheckbox = screen.getByLabelText('Auto-refresh every 5 second');
    fireEvent.click(autoRefreshCheckbox);

    axios.get.mockClear();
    
    fireEvent.click(autoRefreshCheckbox);
    
    vi.advanceTimersByTime(5000);
    expect(axios.get).not.toHaveBeenCalled();

    vi.useRealTimers();
  });
});