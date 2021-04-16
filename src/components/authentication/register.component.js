import React, { useCallback, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthenticationDataService from "services/authentication.service";
import { useHistory, Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [error, setError] = useState("");

  const history = useHistory();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      AuthenticationDataService.register(
        displayName,
        email,
        password,
        passwordConfirmation
      )
        .then(() => {
          history.push("/");
        })
        .catch((e) => {
          setError(e.response.data.join(". "));
        });
    },
    [displayName, email, password, passwordConfirmation, history]
  );

  const displayNameChanged = (e) => {
    setDisplayName(e.target.value);
  };

  const emailChanged = (e) => {
    setEmail(e.target.value);
  };

  const passwordChanged = (e) => {
    setPassword(e.target.value);
  };

  const passwordConfirmationChanged = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="col-md-6 ml-auto mr-auto mt-lg-5 text-center"
    >
      <Form.Control
        placeholder="Display Name"
        className="mb-3 text-center"
        value={displayName}
        onChange={displayNameChanged}
      />

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

      <Form.Control
        type="password"
        placeholder="Confirm Password"
        className="mb-3 text-center"
        value={passwordConfirmation}
        onChange={passwordConfirmationChanged}
      />

      <Button variant="primary" className="w-75 ml-auto mr-auto" type="submit">
        Register
      </Button>

      <Button
        to="/"
        as={Link}
        variant="secondary"
        className="mt-1 w-75 ml-auto mr-auto"
      >
        Cancel
      </Button>

      <p className="error-text mb-2 fs-5">{error}</p>
    </Form>
  );
}

export default Register;
