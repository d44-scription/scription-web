import React from "react";
import PropTypes from "prop-types";

function Gem(props) {
  return (
    <section>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        fill="currentColor"
        className="notable-link bi bi-gem"
        viewBox="0 0 16 16"
      >
        <title>{props.title}</title>
        <path
          fillRule="evenodd"
          d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785l-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004l.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495l5.062-.005L8 13.366 5.47 5.495zm-1.371-.999l-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l2.92-.003 2.193 6.82L1.5 5.5zm7.889 6.817l2.194-6.828 2.929-.003-5.123 6.831z"
        />
      </svg>

      <h3 style={{ display: props.hideTitle ? "none" : "inherit" }}>Items</h3>
    </section>
  );
}

Gem.defaultProps = {
  size: 96,
  hideTitle: false,
  title: "Picture of a gem",
};

Gem.propTypes = {
  size: PropTypes.number.isRequired,
  hideTitle: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Gem;
