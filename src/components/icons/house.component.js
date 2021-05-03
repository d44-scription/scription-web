import React from "react";
import PropTypes from "prop-types";

function House(props) {
  return (
    <section>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        fill="currentColor"
        className="notable-link bi bi-house-door"
        viewBox="0 0 16 16"
      >
        <title>{props.title}</title>
        <path
          fillRule="evenodd"
          d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"
        />
        <path
          fillRule="evenodd"
          d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
        />
      </svg>

      <h3 style={{ display: props.hideTitle ? "none" : "inherit" }}>
        Locations
      </h3>
    </section>
  );
}

House.defaultProps = {
  size: 96,
  hideTitle: false,
  title: "Picture of a house",
};

House.propTypes = {
  size: PropTypes.number.isRequired,
  hideTitle: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default House;
