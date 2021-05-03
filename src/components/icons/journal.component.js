import React from "react";
import PropTypes from "prop-types";

function Journal(props) {
  return (
    <section>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        fill="currentColor"
        className="notable-link bi bi-journal"
        viewBox="0 0 16 16"
      >
        <title>{props.title}</title>
        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
      </svg>

      <h3 style={{ display: props.hideTitle ? "none" : "inherit" }}>
        Unlinked
      </h3>
    </section>
  );
}

Journal.defaultProps = {
  size: 96,
  hideTitle: false,
  title: "Picture of a journal",
};

Journal.propTypes = {
  size: PropTypes.number.isRequired,
  hideTitle: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Journal;
