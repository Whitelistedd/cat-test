import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = ({ imageUrl }) => {
  return (
    <Container>
      {imageUrl ? (
        <Image src={imageUrl} alt="Random cat" />
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
};

export default ImageContainer;