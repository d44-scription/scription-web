import React from "react";
import PropTypes from "prop-types";

function Person(props) {
  return (
    <section>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        fill="currentColor"
        className={`notable-link bi bi-person ${props.class}`}
        viewBox="0 0 16 16"
      >
        <title>{props.title}</title>
        <path
          fillRule="evenodd"
          d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
        />
      </svg>

      <h3 style={{ display: props.hideTitle ? "none" : "inherit" }}>
        Characters
      </h3>
    </section>
  );
}

Person.defaultProps = {
  size: 96,
  hideTitle: false,
  title: "Picture of a person",
};

Person.propTypes = {
  size: PropTypes.number.isRequired,
  hideTitle: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Person;
