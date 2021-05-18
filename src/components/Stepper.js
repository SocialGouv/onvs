import PropTypes from "prop-types";
import React from "react";

const Tab = ({ children, selected = false }) =>
  selected ? (
    <a className="inline-flex items-center justify-center w-1/2 py-3 text-base font-medium leading-none tracking-wide text-gray-100 bg-blue-400 border-b-4 border-r-2 border-blue-500 rounded-t sm:px-6 sm:w-auto sm:justify-start font-evolventa">
      {children}
    </a>
  ) : (
    <a className="inline-flex items-center justify-center w-1/2 py-3 text-base font-medium leading-none tracking-wide text-gray-600 border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start font-evolventa">
      {children}
    </a>
  );

Tab.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.bool,
};

export const Stepper = ({ step, orderedSteps = [] }) => {
  let lastIndex = 1;

  return (
    <section className="container flex flex-col flex-wrap py-1 mx-auto text-gray-700 body-font">
      <div className="flex flex-wrap w-full mb-8 uppercase">
        {orderedSteps.map((element, index) => {
          if (element.label) {
            const formatIndex = String(lastIndex++).padStart(2, "0");
            return (
              <Tab
                key={element.name}
                selected={index === step - 1}
              >{`${formatIndex}/ ${element.label}`}</Tab>
            );
          }
        })}
      </div>
    </section>
  );
};

Stepper.propTypes = {
  orderedSteps: PropTypes.array,
  step: PropTypes.number,
};
