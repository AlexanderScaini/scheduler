import React from "react";

import Empty from 'components/Appointment/Empty.js';
import Show from 'components/Appointment/Show.js';
import Form from 'components/Appointment/Form.js';
import Status from 'components/Appointment/Status.js';
import Confirm from 'components/Appointment/Confirm.js';

import { useVisualMode } from '../../hooks/useVisualMode.js'

import 'components/Appointment/styles.scss'

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";  
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }

  function confirming() {
    transition(CONFIRM)
  }

  function trash() {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
  }

  return (
    <div>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show 
        student={props.interview && props.interview.student} 
        interviewer={props.interview && props.interview.interviewer}
        onDelete={confirming}
      />)}
      {mode === CREATE && <Form 
      interviewers={props.interviewers}
      onCancel={() => back()}
      onSave={(name, interviewer) => save(name, interviewer)} />}
      {mode === SAVING && <Status />}
      {mode === CONFIRM && <Confirm 
      message={"Are you sure you would like to delete?"}
      onConfirm={trash}
      onCancel={back}
      />}
      {mode === DELETING && <Status message={"Deleting"} />}
    </div>
    
  )
}


