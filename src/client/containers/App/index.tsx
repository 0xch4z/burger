import * as React from 'react';

export class App extends React.Component {

  public render() {
    const { children } = this.props;
    return (
      <div id="wrapper">
        {children}
      </div>
    )
  }

}
