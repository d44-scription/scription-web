import React, { useCallback, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthenticationDataService from "../../services/authentication.service";
import { useHistory } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      AuthenticationDataService.login(email, password).then(() => {
        history.push("/notebooks");
      });
    },
    [email, password, history]
  );

  const emailChanged = (e) => {
    setEmail(e.target.value);
  };

  const passwordChanged = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Control
        type="email"
        placeholder="Email"
        value={email}
        onChange={emailChanged}
      />

      <Form.Control
        type="password"
        placeholder="Password"
        value={password}
        onChange={passwordChanged}
      />

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Login;
