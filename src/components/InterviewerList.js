import React from "react";
import classNames from "classnames"
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  // const interviewerClass = classNames({
  //   "interviewers": true,
  //   "interviewers__item--selected": props.selected,
  // });

  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {props.interviewers.map(interviewer => {
        return <InterviewerListItem 
        avatar={interviewer.avatar} 
        key={interviewer.id} 
        name={interviewer.name} 
        selected={interviewer.id === props.interviewer} 
        setInterviewer={() => props.setInterviewer(interviewer.id)}/>
      })}
    </ul>
  </section>
  );
}