import { ExternalLinkIcon } from "@heroicons/react/solid";
import { MDXProvider } from "@mdx-js/react";
import { PropTypes } from "prop-types";
import React from "react";

import { Layout } from "./Layout";

// TODO: Heading1/Heading2/Answer ont été faits à l'origin pour la FAQ. Voir si l'on crée un autre style
// pour les autres pages ou si l'on renomme avec des noms plus génériques
const Heading1 = ({ children }) => (
  <h1 className="py-8 mt-5 text-xl font-bold text-center text-indigo-700 font-evolventa">
    {children}
  </h1>
);

const Heading2 = ({ children }) => (
  <h2 className="pb-2 mt-5 text-left text-pink-600 capitalize font-evolventa">
    {children}
  </h2>
);

const Heading3 = ({ children }) => (
  <h3 className="my-2 font-semibold">{children}</h3>
);

const Heading4 = ({ children }) => (
  <h4 className="my-2 font-semibold">{children}</h4>
);

const Heading5 = ({ children }) => (
  <h5 className="my-4 italic font-medium">{children}</h5>
);

const Paragraph = ({ children }) => (
  <p className="mb-6 leading-7 text-gray-900">{children}</p>
);

const BulletList = ({ children }) => (
  <ul className="mb-4 list-disc list-inside">{children}</ul>
);

const OrderedList = ({ children }) => (
  <ol className="list-decimal list-inside ">{children}</ol>
);
const Table = ({ children }) => (
  <table className="border-collapse table-auto">{children}</table>
);

const Cell = ({ children }) => (
  <td className="px-1 py-1 border border-gray-400">{children}</td>
);

const Anchor = ({ children, ...props }) => (
  <a className="text-blue-600 hover:underline" {...props}>
    {children}&nbsp;
    <ExternalLinkIcon className="inline w-4 h-4" />
  </a>
);

const Strong = ({ children }) => (
  <span className="font-medium">{children}</span>
);

Heading1.propTypes = {
  children: PropTypes.node.isRequired,
};
Heading2.propTypes = Heading1.propTypes;
Heading3.propTypes = Heading1.propTypes;
Heading4.propTypes = Heading1.propTypes;
Heading5.propTypes = Heading1.propTypes;
Paragraph.propTypes = Heading1.propTypes;
BulletList.propTypes = Heading1.propTypes;
OrderedList.propTypes = Heading1.propTypes;
Table.propTypes = Heading1.propTypes;
Cell.propTypes = Heading1.propTypes;
Anchor.propTypes = Heading1.propTypes;
Strong.propTypes = Heading1.propTypes;

const mdComponents = {
  a: Anchor,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  ol: OrderedList,
  p: Paragraph,
  strong: Strong,
  table: Table,
  td: Cell,
  ul: BulletList,
};

const MdxWrapper = ({ children }) => {
  return (
    <MDXProvider components={mdComponents}>
      <Layout>{children}</Layout>
    </MDXProvider>
  );
};

MdxWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MdxWrapper;
