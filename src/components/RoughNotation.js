import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { annotate } from "rough-notation";

export const RoughNotation = ({
  children,
  type = "highlight",
  color = "orange",
  animate = true,
  animationDuration = 1000,
  ...config
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const annotation = annotate(ref.current, {
      animate,
      animationDuration,
      color,
      type,
      ...config,
    });
    // A bit of randomness, to show annoted elements with different schedule
    setTimeout(() => {
      annotation.show();
    }, Math.random() * 1000);
  }, [ref, type, color, animate, animationDuration, config]);

  return <span ref={ref}>{children}</span>;
};

RoughNotation.propTypes = {
  animate: PropTypes.bool,
  animationDuration: PropTypes.number,
  children: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
};
