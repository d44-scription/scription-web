import React, { useCallback, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthenticationDataService from "services/authentication.service";
import { Link } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      AuthenticationDataService.login(email, password)
        .then(() => {
          window.location.replace("/notebooks");
        })
        .catch((e) => {
          setError(e.response.data.errors);
        });
    },
    [email, password]
  );

  const emailChanged = (e) => {
    setEmail(e.target.value);
  };

  const passwordChanged = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="col-md-6 ml-auto mr-auto mt-lg-5 text-center"
    >
      <h1 className="fs-0-lg d-lg-block d-none">Scription</h1>

      <Form.Control
        type="email"
        placeholder="Email"
        className="mb-3 text-center"
        value={email}
        onChange={emailChanged}
      />

      <Form.Control
        type="password"
        placeholder="Password"
        className="mb-3 text-center"
        value={password}
        onChange={passwordChanged}
      />

      <Button variant="primary" className="w-75 ml-auto mr-auto" type="submit">
        Log in
      </Button>

      <Button
        to="/register"
        as={Link}
        variant="secondary"
        className="mt-1 w-75 ml-auto mr-auto"
      >
        Register
      </Button>

      <p className="error-text mb-2 fs-5">{error}</p>
    </Form>
  );
}

export default Login;
