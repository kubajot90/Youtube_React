import Card from "react-bootstrap/Card";
import classes from "./LoadingCard.module.css";

const LoadingCard = () => {
  return (
    <Card
      style={{ minWidth: "277px" }}
      className="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2 col-xxl-1 m-3 flex-grow-1"
    >
      <div className={classes.loadingImg} />
      <Card.Body className={`d-flex`}>
        <div className={classes.profileImg}></div>
        <div className={classes.profileDescription}></div>
      </Card.Body>
    </Card>
  );
};

export default LoadingCard;
