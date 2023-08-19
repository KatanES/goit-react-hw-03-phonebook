import { styled } from 'styled-components';
import { Form, ErrorMessage, Field } from 'formik';
export const StyledForm = styled(Form)`
  padding: 10px;
  background-color: blanchedalmond;
`;

export const StyledField = styled(Field)`
  padding: 4px;
  margin: 15px 15px;
  background-color: whitesmoke;
  border: solid 2px black;
  width: auto;
  height: 15px;
  display: flex;
  flex-direction: column;
`;

export const StyledError = styled(ErrorMessage)`
  color: red;
`;
