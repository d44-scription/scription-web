import React from "react";
import { MentionsInput, Mention } from "react-mentions";
import "scss/mentionable.scss";
import PropTypes from "prop-types";

function MentionableReadonly(props) {
  return (
    <div>
      <MentionsInput
        value={props.value}
        className="mentions-readonly"
        readOnly
        aria-label="Note contents"
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

MentionableReadonly.propTypes = {
  // The value to show
  value: PropTypes.string.isRequired,
};

export default MentionableReadonly;
