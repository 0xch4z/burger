import * as React from 'react';

const style = require('./style.css');

export class App extends React.Component {

  public render() {
    const { children } = this.props;
    return (
      <main className={style.AppContainer}>
        {children}
      </main>
    )
  }

}
