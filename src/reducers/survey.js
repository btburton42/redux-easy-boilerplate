import bootstrap from 'json!assets/bootstrap.survey.data';
import { getIntOfLength } from 'utils/math';

function getSeedArray(){
  return Array.apply(null, Array(bootstrap.questions.length)).map(function (_, i) {return i;})
};

// SEED STATE STRUCTURE FOR LINEAR PATH, DEPENDANT IMAGE, MULTI ANSWER POLL
// const initialState = {
//   survey: {
//     index: 0,
//     score: 0,
//     questions: [{
//       question: 'Truth or Dare?',
//       image: 'http://carolineteselle.com/live/wp-content/uploads/2014/10/truth-or-dare_large.jpg',
//       choices: [{
//         text: 'Truth'
//       },
//       {
//         text: 'Dare'
//       }],
//       answer: 'Truth'
//     }]
//     current: {
//       displayImage: "",
//       question: "",
//       choices: ""
//     }
//   }
// }

// SEED STATE STRUCTURE FOR:
// RANDOM PATH,
// RANDOM IMAGE,
// SINGLE ANSWER SET,
// WITH CORRECT ANSWERS AND SCORING

const initialState = {
  survey: {
    options: {
      linear: false,
      keepScore: true,
      bootstrap: bootstrap
    },
    current: getNewCurrent(getIntOfLength(bootstrap.questions)),
    questionsAnswered: [],
    questionsRemaining: getSeedArray(),
    questionsCorrect: 0,
    questionsIncorrect: 0,
    answerClass: []
  }
}

function getNewCurrent(questionId = 0){
  return ({
    image: bootstrap.images[getIntOfLength(bootstrap.images)].image,
    question: bootstrap.questions[questionId].question,
    correctAnswer: bootstrap.questions[questionId].answer,
    answers: bootstrap.answers,
    questionId: questionId,
  })
}

export function survey(state = initialState, action) {
  switch(action.type) {
    case 'SURVEY_SUBMIT':
      // # order is important here
      const currentQuestionId = state.survey.questionsRemaining.indexOf(state.survey.current.questionId);
      // # check the score first. did they answer the question correctly?
      if (state.survey.current.correctAnswer == action.answer) {
        state.survey.questionsCorrect++;
        var newAnswerClass = {
          className: 'correct'
        }
      } else {
        state.survey.questionsIncorrect++
        var newAnswerClass = {
          className: 'incorrect'
        }
      };
      // # pop old question off the stack and retire it
      state.survey.questionsAnswered.push(state.survey.questionsRemaining.splice(currentQuestionId, 1))
      // set new questionId from remaining questions
      const newQuestionId = state.survey.questionsRemaining[getIntOfLength(state.survey.questionsRemaining)];
      return {
        ...state,
        survey: {
          ...state.survey,
          current: getNewCurrent(newQuestionId),
          answerClass: [...state.survey.answerClass,
            newAnswerClass]
        }
      };
    case 'SURVEY_REFRESH':
      return {
        ...state,
        survey: {
          ...initialState.survey,
          questionsAnswered: [],
          questionsRemaining: getSeedArray(),
          questionsCorrect: 0,
          questionsIncorrect: 0
        }
      }
    default:
      return state;
  }
}
