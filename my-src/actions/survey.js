export function surveySubmit(answer) {
  return {
    type: 'SURVEY_SUBMIT',
    answer,
  };
}

export function surveyRefresh() {
  return {
    type: 'SURVEY_REFRESH'
  }
}
