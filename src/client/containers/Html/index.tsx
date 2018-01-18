import * as React from 'react'
import * as serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';

import { Store } from '../../models';

interface HtmlProps {
  readonly manifest?: any;
  readonly markup?: string;
  readonly store?: Redux.Store<Store>;
}

export class Html extends React.Component<HtmlProps, {}> {
  private resolve(files) {
    return files.map((src) => {
      if (!this.props.manifest[src]) { return; }
      return '/public/' + this.props.manifest[src];
    }).filter((file) => file !== undefined);
  }

  public render() {
    const head = Helmet.rewind();
    const { markup, store } = this.props;

    let styles = this.resolve(['vendor.css', 'app.css']).map((src, i) => (
      <link key={i} rel="stylesheet" type="text/css" href={src} />
    ));

    const scripts = this.resolve(['vendor.js', 'app.js']).map((src, i) => (
      <script key={i} src={src} />
    ));

    console.log('pres');
    console.log('typeof store => ', typeof store);

    const initialState = (
      <script
        dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${serialize(store.getState(), { isJSON: true })};` }}
        charSet="utf8"
      />
    )

    return (
      <html>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          {styles}
        </head>
        <body>
          <main id="app" dangerouslySetInnerHTML={{ __html: markup }} />
          {initialState}
          {scripts}
        </body>
      </html>
    )
  }
}
