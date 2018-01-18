import * as React from 'react';

import { Header } from 'components';

const style = require('./style.css');

export class App extends React.Component {

  public render() {
    const { children } = this.props;
    return (
      <main className={style.AppContainer}>
        <Header />
        {children}
      </main>
    )
  }

}
