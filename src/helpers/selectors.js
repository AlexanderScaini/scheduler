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

  // console.log(filteredAppointments)
  return filteredAppointments
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  const filteredInterviewer = state.interviewers[interview.interviewer]
  const filteredInterview = {
    interviewer: {...filteredInterviewer},
    student: interview.student,
  }
  // console.log(filteredInterview)
  return filteredInterview
}

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return []
  }

  const filteredIds = state.days.filter(days => days.name === day)[0]
  // console.log(filteredIds)
  if (!filteredIds) {
    return []
  }  

  const filteredInterviewers = filteredIds.interviewers.map(id => {
    return state.interviewers[id]
  })

  // console.log(filteredInterviewers)
  return filteredInterviewers
}