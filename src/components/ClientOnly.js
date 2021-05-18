import PropTypes from "prop-types";
import React from "react";

/**
 * This prevent error in SSR for components which renders can't be pre determined in SSR.
 *
 * See https://www.joshwcomeau.com/react/the-perils-of-rehydration/.
 *
 * @param {node} children - the children React components
 */
export function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <div {...delegated}>{children}</div>;
}

ClientOnly.propTypes = {
  children: PropTypes.node,
};
