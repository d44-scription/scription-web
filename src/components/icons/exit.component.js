import React from "react";
import PropTypes from "prop-types";

function Exit(props) {
  return (
    <section>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        fill="currentColor"
        className={`notable-link bi bi-box-arrow-right ${props.class}`}
        viewBox="0 0 16 16"
      >
        <title>{props.title}</title>
        <path
          fillRule="evenodd"
          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
        />
        <path
          fillRule="evenodd"
          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
        />
      </svg>
    </section>
  );
}

Exit.defaultProps = {
  size: 96,
  title: "Exit",
};

Exit.propTypes = {
  size: PropTypes.number.isRequired,
  class: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Exit;
