import styled from 'styled-components';
import { useState } from 'react';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
`;

const Header = ({ enabled, autoRefresh, onEnabledChange, onAutoRefreshChange }) => {
  return (
    <HeaderContainer>
      <CheckboxLabel>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onEnabledChange(e.target.checked)}
        />
        Enabled
      </CheckboxLabel>
      <CheckboxLabel>
        <input
          type="checkbox"
          checked={autoRefresh}
          onChange={(e) => onAutoRefreshChange(e.target.checked)}
        />
        Auto-refresh every 5 second
      </CheckboxLabel>
    </HeaderContainer>
  );
};

export default Header;