import styled from 'styled-components'

export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`
export const Input = styled.input.attrs({ spellcheck: 'false' })``
