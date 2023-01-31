import { useEffect, useReducer } from "react";
import classes from "./DateCounter.module.css";

const DateCounter = (props) => {
  const publishedDate = Date.parse(props.date);
  const actualDate = Date.parse(new Date());
  const dateDiff = actualDate - publishedDate;

  const reducer = (state, dateDiff) => {
    if (dateDiff / 60000 < 60) {
      return `${Math.round(dateDiff / 60000)} minut temu`;
    } else if (dateDiff / 3.6e6 < 24) {
      return `${Math.round(dateDiff / 3.6e6)} godzin temu`;
    } else if (dateDiff / 8.64e7 < 7) {
      return `${Math.round(dateDiff / 8.64e7)} dni temu`;
    } else if (dateDiff / 2.628e9 < 12) {
      return `${Math.round(dateDiff / 2.628e9)} miesięcy temu`;
    } else {
      const difference = Math.round(dateDiff / 3.154e10);
      if (difference < 2) {
        return `${difference} rok temu`;
      } else if (difference < 5) {
        return `${difference} lata temu`;
      } else {
        return `${difference} lat temu`;
      }
    }
  };

  const [date, setDate] = useReducer(reducer, "");

  useEffect(() => {
    setDate(dateDiff);
  }, [dateDiff]);

  return <p className={classes.dateCounter}>{date}</p>;
};

export default DateCounter;
