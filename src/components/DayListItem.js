import React from "react";
import classNames from "classnames"
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  const formatSpots = (spots) => {
    if(spots) {
      if(spots === 1){
        return "1 spot remaining"
      } else {
        return `${spots} spots remaining`
      }
    } else {
      return "no spots remaining"
    }
  }

  return (
    <li data-testid={"day"} className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

