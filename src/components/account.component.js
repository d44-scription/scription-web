import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import InlineEditor from "./editors/inline_editor.component";
import UserDataService from "services/user.service";

function Account(props) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const id = localStorage.getItem("id");

  useEffect(() => {
    UserDataService.get(id).then((response) => {
      setEmail(response.data.email);
      setDisplayName(response.data.display_name);
    });
  }, [id]);

  const saveDisplayName = () => {
    return UserDataService.update(id, "display_name", displayName);
  };

  const saveEmail = () => {
    return UserDataService.update(id, "email", email);
  };

  return (
    <div className="col-md-6">
      <InlineEditor
        value={displayName}
        setValue={setDisplayName}
        action={saveDisplayName}
        formLabel="Display Name"
        placeholder="No display name"
        fontSize="2rem"
      />

      <InlineEditor
        value={email}
        setValue={setEmail}
        action={saveEmail}
        formLabel="Email Address"
        fontSize="2rem"
      />

      <Button
        to="/notebooks"
        as={Link}
        variant="secondary"
        className="mt-1 w-100"
      >
        Return
      </Button>
    </div>
  );
}

export default Account;
