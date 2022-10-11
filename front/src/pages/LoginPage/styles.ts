import styled from 'styled-components'

export const Input = styled.input`
  width: 100%;
  padding: 7px 16px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 2px #16577e;
    border: 1px solid #16577e;
  }
`

export const LoginBtn = styled.button`
  width: 120px;
  height: 40px;
  background: #d9d9d9;
  border-radius: 6px;
  margin-top: 50px;
  color: #783e76;
  transition: 0.2s;

  :hover {
    opacity: 0.5;
  }
`

export const LoginInput = styled.input`
  color: #783e76;
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  margin-top: 50px;
`
