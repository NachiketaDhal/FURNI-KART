import React from "react";
import Styled from "styled-components";

const Button = Styled.button`
 background-color: ${(props) => (props.primary ? "green" : "white")};
  color: ${(props) => (props.primary ? "white" : "green")};
  padding: .5rem 1.5rem;
  border-radius: 3px;
  border: none;
`;

const Container = Styled.div`
    background-color: red;
    color: #fff;
  .hero {
    font-size: 5rem
  }
`;

function Testing() {
  return (
    <div>
      <h4>comfy sloth starter</h4>
      <Button primary>Click me</Button>
      <Button>Click me</Button>
      <Container>
        <div className="hero">Hero Section</div>
      </Container>
    </div>
  );
}

export default Testing;
