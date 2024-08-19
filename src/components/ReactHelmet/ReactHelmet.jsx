import { Helmet } from "react-helmet";

const ReactHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>Ondel {title ? `| ${title}` : ""}</title>
      <meta name="description" content={`${title} Page`} />
    </Helmet>
  );
};
export default ReactHelmet;
