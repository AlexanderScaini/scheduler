import React, { useState, useEffect } from "react";
import axios from "axios";
import DayListItem from "components/DayListItem";
// import DayList from "components/DayList";
// import DayListItem from "components/DayListItem";

export function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      // console.log(all[0].data)
      // console.log(all[1].data)
      // console.log(all[2].data)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, [])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const updatedAppointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updatedDays = state.days.map(day => {
      const newDay = {...day}
      if (newDay.name === state.day) {
        newDay.spots = newDay
                        .appointments
                        .filter(id => updatedAppointments[id].interview === null)
                        .length
      }
      return newDay
    })

    console.log(updatedDays)

    return axios.put(`http://localhost:8001/api/appointments/${id}`,appointment)
    .then(() => setState({...state, appointments: updatedAppointments, days: updatedDays}))
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const updatedAppointments = {
      ...state.appointments,
      [id]: appointment
    };
    const updatedDays = state.days.map(day => {
      const newDay = {...day}
      if (newDay.name === state.day) {
        newDay.spots = newDay
                        .appointments
                        .filter(id => updatedAppointments[id].interview === null)
                        .length
      }
      return newDay
    })

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => setState({...state, appointments: updatedAppointments, days: updatedDays}))
  }

  return {state, setDay, bookInterview, cancelInterview}
}

/*AFTER book interview happens update the spots for that specific day to be -1*/