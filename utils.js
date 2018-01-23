import styled from 'styled-components'

export const Button = styled.button`
  background: none;
  border: ${props => props.theme.thinBorder};
  background: black;
  cursor: pointer;
  color: white;
  font-family: ${props => props.theme.font};
  font-weight: 900;
  padding: ${props => props.theme.smallPad};
  &:focus {
    outline: none;
  }
`
export const Input = styled.input.attrs({ spellCheck: 'false' })`
  border: ${props => props.theme.thinBorder};
  font-family: ${props => props.theme.font};
  padding: ${props => props.theme.smallPad};
  &:focus {
    outline: none;
  }
`
