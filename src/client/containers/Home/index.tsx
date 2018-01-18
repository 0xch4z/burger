import * as React from 'react';
import { routerActions, RouterAction } from 'react-router-redux';

import Button from 'material-ui/RaisedButton';

import { connect } from '../../utils';

interface Props {
  readonly pushRoute: Redux.ActionCreator<RouterAction>
}

@connect(
  null,
  dispatch => ({
    pushRoute: r => dispatch(routerActions.push(r)),
  })
)
export class Home extends React.Component<Props, any> {

  public render() {
    return (
      <div>
        <h1>Test</h1>
        <Button
          onClick={this.handleButtonClick.bind(this)}
        >
          foo
        </Button>
      </div>
    )
  }

  private handleButtonClick(e) {
    e.preventDefault();

    this.props.pushRoute('/foo');
  }

}
