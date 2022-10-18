import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    gap: 5.6rem;
    align-items: center;
  }
`

const BaseButtonContainer = styled.button`
  width: 100%;
  border: 0;
  padding: 1.6rem;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.8rem;
  font-weight: bold;

  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
export const StopButtonContainer = styled(BaseButtonContainer)`
  background: ${(props) => props.theme['red-500']};
  color: ${(props) => props.theme['gray-100']};
  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-700']};
  }
`

export const StartButtonContainer = styled(BaseButtonContainer)`
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};
  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`
