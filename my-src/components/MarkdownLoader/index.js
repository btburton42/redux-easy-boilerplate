import React from 'react';

import { styles } from './styles.scss';

const MarkdownLoader = ({ file }) => {
  let createMarkup = (file) => {return {__html: file}}
  return (
  <section id="markdown" className={`${styles}`}>
    <div dangerouslySetInnerHTML={createMarkup(file)} className={`${styles}`}/>
  </section>
)}

export default MarkdownLoader
