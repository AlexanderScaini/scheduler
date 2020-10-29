import React from "react";

import Header from 'components/Appointment/Header.js';
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


  return (
    <div>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show 
        student={props.interview.student} 
        interviewer={props.interview.interviewer}
      />)}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} />}
    </div>
    
  )
}


