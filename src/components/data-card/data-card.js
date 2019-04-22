import "./data-card.scss";
import { Link } from "react-router-dom";
import moment from "moment";

const DataCard = props => {
  const fileTypes = fileTypes => {
    return fileTypes.map(fileType => (
      <span key={fileType} className="file-type">
        {fileType}{" "}
      </span>
    ));
  };

  const dataset = props.dataset;
  return (
    <data-card>
      <Link
        className="title"
        to={`/dataset/${dataset.organization_name}/${dataset.name}`}
      >
        {dataset.title}
      </Link>
      <div className="description">
        {dataset.description.substring(0, 240)}
        {dataset.description.length > 240 && <span> ...</span>}
      </div>
      <div className="card-metadata">
        <div className="last-modified">
          Updated {moment(dataset.modifiedTime).format("MMM DD, YYYY")}
        </div>
        <div className="separator">•</div>
        <div className="file-types">
          File Type: {fileTypes(dataset.fileTypes)}{" "}
        </div>
      </div>
    </data-card>
  );
};

export default DataCard;
