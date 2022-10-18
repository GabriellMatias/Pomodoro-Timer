import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  ${(props) => props.theme['gray-100']};
  font-size: 1.8rem;
  font-weight: bold;
  flex-wrap: wrap;
`
const BaseInput = styled.input`
  background: transparent;
  height: 4rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: 1.8rem;
  padding: 0 0.8rem;
  color: ${(props) => props.theme['gray-100']};

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }
`
export const TaskTextInput = styled(BaseInput)`
  flex: 1; /* atalho pra setar*/
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`
export const TaskNumberInput = styled(BaseInput)`
  width: 6.4rem;
`
