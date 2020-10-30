import React from "react";

import Empty from 'components/Appointment/Empty.js';
import Show from 'components/Appointment/Show.js';
import Form from 'components/Appointment/Form.js';

import { useVisualMode } from '../../hooks/useVisualMode.js'

import 'components/Appointment/styles.scss'

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // console.log(interview)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }


  return (
    <div>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show 
        student={props.interview.student} 
        interviewer={props.interview.interviewer}
      />)}
      {mode === CREATE && <Form 
      interviewers={props.interviewers}
      onCancel={() => back()}
      onSave={(name, interviewer) => save(name, interviewer)} />}
    </div>
    
  )
}


