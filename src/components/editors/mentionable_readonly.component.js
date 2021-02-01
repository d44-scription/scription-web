import React from "react";
import { MentionsInput, Mention } from "react-mentions";
import "../../scss/mentionable.scss";

function MentionableReadonly(props) {
  return (
    <div>
      <MentionsInput
        value={props.value}
        className="mentions-readonly"
        readOnly
      >
        <Mention
          trigger="@"
          markup="@[__display__](@__id__)"
          className="characters"
        />

        <Mention
          trigger=":"
          markup=":[__display__](:__id__)"
          className="items"
        />

        <Mention
          trigger="#"
          markup="#[__display__](#__id__)"
          className="locations"
        />
      </MentionsInput>
    </div>
  );
}

export default MentionableReadonly;