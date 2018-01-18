import * as React from 'react';
import AppBar from 'material-ui/AppBar';

const style = require('./style.css');

interface Props {

}

export class Header extends React.Component<Props, any> {

  public render() {
    return(
      <AppBar
        title="Burger"
        className={style.AppBar}
      />
    );
  }

}
