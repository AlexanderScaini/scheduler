import React from "react";

import Empty from 'components/Appointment/Empty.js';
import Show from 'components/Appointment/Show.js';
import Form from 'components/Appointment/Form.js';
import Status from 'components/Appointment/Status.js';
import Confirm from 'components/Appointment/Confirm.js';
import Error from 'components/Appointment/Error.js';

import { useVisualMode } from '../../hooks/useVisualMode.js'

import 'components/Appointment/styles.scss'

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";  
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING"
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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
    .catch(error => transition(ERROR_SAVE, true));
  }

  function confirming() {
    transition(CONFIRM)
  }

  function trash() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }

  function edit() {
    transition(EDIT)
  }

  return (
    <div>
      <article data-testid={"appointment"}>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show 
        student={props.interview && props.interview.student} 
        interviewer={props.interview && props.interview.interviewer}
        onDelete={confirming}
        onEdit={edit}
      />)}
      {mode === CREATE && <Form 
      interviewers={props.interviewers}
      onCancel={() => back()}
      onSave={(name, interviewer) => save(name, interviewer)} />}
      {mode === SAVING && <Status message={"Saving"}/>}
      {mode === CONFIRM && <Confirm 
      message={"Are you sure you would like to delete?"}
      onConfirm={trash}
      onCancel={back}
      />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === EDIT && <Form 
      interviewers={props.interviewers}
      interviewer={props.interview.interviewer.id}
      name={props.interview.student}
      onCancel={() => back()}
      onSave={(name, interviewer) => save(name, interviewer)} 
      />} 
      {mode === ERROR_DELETE && <Error 
      message={"Could not delete this appointment"}
      onClose={back}
      />}
       {mode === ERROR_SAVE && <Error 
      message={"Could not make this appointment"}
      onClose={back}
      />}
      </article>
    </div>
  )
}


