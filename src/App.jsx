import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from './components/Header/Header';
import ImageContainer from './components/ImageContainer/ImageContainer';
import Button from './components/Button/Button';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const [enabled, setEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const fetchCatImage = async () => {
    if (!enabled) return;
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search');
      setImageUrl(response.data[0].url);
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }
  };

  const handleRefreshChange = (value) => {
    setEnabled(value);
    if (!value) setAutoRefresh(false);
  }

  useEffect(() => {
    fetchCatImage();
  }, []);

  useEffect(() => {
    let interval;
    if (autoRefresh && enabled) {
      interval = setInterval(fetchCatImage, 5000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh, enabled, imageUrl]);

  return (
    <AppContainer>
      <Header
        enabled={enabled}
        autoRefresh={autoRefresh}
        onEnabledChange={handleRefreshChange}
        onAutoRefreshChange={setAutoRefresh}
      />
      <ImageContainer imageUrl={imageUrl} />
      <Button onClick={fetchCatImage} disabled={!enabled} />
    </AppContainer>
  );
}

export default App
