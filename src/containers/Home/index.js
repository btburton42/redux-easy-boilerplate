import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

/* components */
import { TopImage } from 'components/TopImage';
import { Tools } from 'components/Tools';
import { MarkdownLoader } from 'components/MarkdownLoader';

import ReadMe from '../../../README.md'

const metaData = {
  title: 'BoilerPlate Title',
  description: 'Start you project easy and fast with modern tools',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags',
    },
  },
};

export class Home extends Component {
  render() {
    return (
      <section>
        <DocumentMeta {...metaData} />
        <TopImage />
        <MarkdownLoader file={ReadMe} />
        <Tools />
      </section>
    );
  }
}
