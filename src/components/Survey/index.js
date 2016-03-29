import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { reduxForm } from 'redux-form';

// component styles
import { styles } from './styles.scss';

const Survey = ({ ...props, surveySubmit, surveyRefresh }) => {
  const survey = props.survey;
  const {
    fields: {answer}
  } = props;
  const imageStyle = {backgroundImage: `url('${survey.current.image}')`}
  const surveyComplete = (survey.questionsAnswered.length >= survey.options.bootstrap.questions.length) ? 'survey-complete' : null
  return (
  <section className={styles}>
    <div className={`flex-container survey-container ${surveyComplete}`}>
      <div className='row'>
        <div className="flex-item"><p className="extended bold is-correct">{survey.questionsCorrect} Correct</p></div>
        <div className="flex-item"><p className="extended bold is-incorrect">{survey.questionsIncorrect} Incorrect</p></div>
        <div className="flex-item">
          <button className='btn btn-danger' onClick={surveyRefresh}>AGAIN!</button>
        </div>
      </div>
    </div>

    <div style={imageStyle} className='image-container'>
      <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        {
          survey.answerClass.map((answerClass, index) =>
            <div className={`answer-color-overlay ${answerClass.className}`} key={index}></div>
          )
        }
      </ReactCSSTransitionGroup>
      <div className={`flex-container text-container`}>
        <div className='row'>
          <div className="flex-item"><p className="extended bold quote-text">{survey.current.question}</p></div>
        </div>
      </div>
    </div>
    <div className='answer-color-overlay'>
      <form className='flex-container' onSubmit={surveySubmit}>
        <div className='row row-flex'>
        {
          survey.current.answers.map((answer, index) =>
          <div className={'flex-item fill'} key={index}>
            <button className='btn btn-danger' id={`input-radio-${index}`} name='survey-answers' data-value={answer.text} {...answer} onClick={surveySubmit}>{answer.text}</button>
          </div>
          )
        }
        </div>
        <div className='row row-flex'>
          <div className={'flex-item fill'}>
            Score: <span className='is-correct'>{survey.questionsCorrect}</span> : <span className='is-incorrect'>{survey.questionsIncorrect}</span>
          </div>
          <div className={'flex-item fill'}>
             <span>Questions: {survey.questionsAnswered.length} / {survey.options.bootstrap.questions.length}</span>
          </div>
        </div>
      </form>
    </div>
  </section>
)}

const SurveyForm = reduxForm({
  form: 'survey',
  fields: ['answer'],
  destroyOnUnmount: false,
})(Survey);

export default SurveyForm
