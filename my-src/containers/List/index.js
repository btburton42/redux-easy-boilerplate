import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';

import { AddItem } from 'components/AddItem';

import Items from 'components/Items';
import Survey from 'components/Survey';

/* actions */
import * as itemActionCreators from 'actions/items';
import * as surveyActionCreators from 'actions/survey';

const assembledActionCreators = Object.assign({}, itemActionCreators, surveyActionCreators)

const metaData = {
  title: 'Component List',
  description: 'Start you project easy and fast with modern tools.',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags',
    },
  },
};

function mapStateToProps (state) {
  return ({
    items: state.items,
    survey: state.survey
  })
}

@connect(
  mapStateToProps,
  dispatch => bindActionCreators(assembledActionCreators, dispatch)
)
export class List extends Component {
  constructor(props) {
    super(props);
  }

  onItemDelete = (event) => {
    event.preventDefault();
    const index = event.currentTarget.dataset.index;
    this.props.delItem(index);
  }

  surveySubmit = (event) => {
    event.preventDefault();
    const answer = event.currentTarget.dataset.value
    this.props.surveySubmit(answer)
  }

  surveyRefresh = () => {
    this.props.surveyRefresh()
  }

  render() {
    return (
      <section>
        <DocumentMeta {...metaData} />
        <div className="container">

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3 col-lg-offset-3">
              <h1>
                Component List
              </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3 col-lg-offset-3">
              <h4>Items Checklist:</h4>
              <Items onDelete={this.onItemDelete} {...this.props.items} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3 col-lg-offset-3">
              <h4>Add Items Box:</h4>
              <AddItem {...this.props} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3 col-lg-offset-3">
              <h4>Survey:</h4>
              <Survey surveySubmit={this.surveySubmit} surveyRefresh={this.surveyRefresh} {...this.props.survey} />
            </div>

          </div>
        </div>
      </section>
    );
  }
}
