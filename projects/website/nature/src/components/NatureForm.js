import React from 'react';
import styled from 'styled-components';

/* props (name | type | description)
  1. formContent | object (key: contentName, content, type, required) | Only valid html input types and textarea are allowed. The number of contents should be bigger than 0.
  2. hasSubmit | bool | Decides whether 'submit' button is displayed or not.
*/

const Form = styled.form`
  margin: 0;
  padding: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0.5rem 0;
`;

const Label = styled.label`
  width: 30%;
`;

const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  width: 60%;
  border: 2px solid black;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  all: unset;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  width: 60%;
  border: 2px solid black;
  border-radius: 4px;
  word-break: break-all;
  resize: vertical;
`;

const Submit = styled.input`
  all: unset;
  padding: 0.5rem 1rem;
  border: 1px solid black;
`;

const htmlInputTypes = ["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"];

function NatureForm(props) {
  const inputHtml = props.formContent.map((elm, index) => {
    if (htmlInputTypes.includes(elm.type)) {      
      return (
        <InputContainer className={`${elm.contentName}-container`} key={index}>
          <Label htmlFor={elm.contentName}>{elm.content}</Label>
          <Input type={elm.type} name={elm.content} required={elm.required} />
        </InputContainer>
      )
    }
    if (elm.type === "textarea") {
      return (
        <InputContainer className={`${elm.contentName}-container`} key={index}>
          <Label htmlFor={elm.contentName}>{elm.content}</Label>
          <TextArea name={elm.content} required={elm.required} />
        </InputContainer>
      )
    }
    return (
      <p>Index {index} element '{elm.contentName}' is not compatible with html types. The type of the element should be one of the following: {htmlInputTypes.concat("textarea").join(', ')}</p>
    )
  })

  return (
    <Form>
      {inputHtml}
      {props.hasSubmit 
        ? <Submit type="submit" value="접수" /> 
        : null}
    </Form> 
  )
}

export default NatureForm;