import React from "react";

// import classNames from "classnames";
import DayListItem from "components/DayListItem";
// import "components/DayList.scss";

export default function DayList(props) {

  return (
    <ul>
      {props.days.map(day => {
        return <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots} 
        selected={day.name===props.day} 
        setDay={props.setDay}
        />
      })}
    </ul>
  );
}