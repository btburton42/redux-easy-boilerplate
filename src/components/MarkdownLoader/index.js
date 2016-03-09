import React, {Component} from 'react';

import { styles } from './styles.scss';

export class MarkdownLoader extends Component {
  componentDidMount() {
    document.getElementById('markdown').innerHTML = this.props.file;
  }
  render() {
    return (
      <section id="markdown" className={`${styles}`}></section>
    )
  }
}
