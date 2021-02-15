import React, { useState } from "react";
import InlineEditor from "./editors/inline_editor.component";

function Account(props) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const saveDisplayName = () => {

  }
  return (
    <div className="col-md-6">
      <InlineEditor
        value={displayName}
        setValue={setDisplayName}
        action={saveDisplayName}
        placeholder="No Display Name"
        fontSize="2rem"
      />
    </div>
  );
}

export default Account;
