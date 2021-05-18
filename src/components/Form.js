import PropTypes from "prop-types";
import React from "react";

export const Form = ({ children }) => (
  <>
    <div className="container px-16 mx-auto ">{children}</div>
  </>
);

Form.propTypes = {
  children: PropTypes.array,
};
