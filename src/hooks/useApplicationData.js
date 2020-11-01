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
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = state.days.map(day => {
      if (day.name === state.day) {
        day.spots--
      }
      return day
    })

    return axios.put(`http://localhost:8001/api/appointments/${id}`,appointment)
    .then(() => setState({...state, appointments}))
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = state.days.map(day => {
      if (day.name === state.day) {
        day.spots++
      }
      return day
    })

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => setState({...state, appointments}))
  }

  return {state, setDay, bookInterview, cancelInterview}
}

/*AFTER book interview happens update the spots for that specific day to be -1*/