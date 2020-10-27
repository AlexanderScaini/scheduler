import React, { useState } from 'react'
// import classNames from "classnames"
import Button from "components/Button";
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {

  const [name, setName] = useState(props.name || "")
  const [interviewerId, setInterviewerId] = useState(props.interviewer || null)

  const reset = () => {
      setName("")
      setInterviewerId(null)
  }

  const cancel = () => {
      props.onCancel()
      reset()
  }
 
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewerId} 
          onChange={newId => setInterviewerId(newId)} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}