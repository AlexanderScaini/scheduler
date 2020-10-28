import React, { useState, useEffect } from "react";
// import axios from "axios";

export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return []
  }
  const filteredIds = state.days.filter(days => days.name === day)[0]
  
  if (!filteredIds) {
    return []
  }  
  const filteredAppointments = filteredIds.appointments.map(id => {
    return state.appointments[id]
  })

  console.log(filteredAppointments)
  return filteredAppointments
}
