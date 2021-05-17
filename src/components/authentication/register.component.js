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
      <h1>Create New Account</h1>

      <Form.Group>
        <Form.Label htmlFor="display-name" className="mb-0">
          Display Name
        </Form.Label>

        <Form.Control
          name="display-name"
          id="display-name"
          placeholder="Enter here"
          className="mb-3 text-center"
          value={displayName}
          onChange={displayNameChanged}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="email" className="mb-0">
          Email Address
        </Form.Label>

        <Form.Control
          type="email"
          name="email"
          id="email"
          placeholder="email@example.com"
          className="mb-3 text-center"
          value={email}
          onChange={emailChanged}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="password" className="mb-0">
          Password
        </Form.Label>

        <Form.Control
          type="password"
          name="password"
          id="password"
          placeholder="Enter here"
          className="mb-3 text-center"
          value={password}
          onChange={passwordChanged}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="password-confirmation" className="mb-0">
          Confirm Password
        </Form.Label>

        <Form.Control
          type="password"
          name="password-confirmation"
          id="password-confirmation"
          placeholder="Enter here"
          className="mb-3 text-center"
          value={passwordConfirmation}
          onChange={passwordConfirmationChanged}
        />
      </Form.Group>

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
