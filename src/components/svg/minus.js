import React from "react";

function Icon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      aria-hidden="true"
      style={{ MsTransform: "rotate(360deg)" }}
      transform="rotate(360)"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="#626262"
        d="M16 10c0 .553-.048 1-.601 1H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H15.4c.552 0 .6.447.6 1z"
      />
    </svg>
  );
}

export default Icon;
