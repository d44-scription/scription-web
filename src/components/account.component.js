import React, { useState, useEffect } from "react";
import InlineEditor from "./editors/inline_editor.component";
import UserDataService from "../services/user.service";

function Account(props) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const id = localStorage.getItem("id");

  useEffect(() => {
    UserDataService.get(id)
    .then((response) => {
      setEmail(response.data.email)
      setDisplayName(response.data.display_name)
    })
  }, [id])

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
        placeholder="No Display Name"
        fontSize="2rem"
      />

      <InlineEditor
        value={email}
        setValue={setEmail}
        action={saveEmail}
        placeholder="Please enter an email"
        fontSize="2rem"
      />
    </div>
  );
}

export default Account;
