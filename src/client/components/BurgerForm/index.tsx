import * as React from 'react';
import SearchBar from 'material-ui-search-bar'

const style = require('./style.css')

interface Props {
  readonly newBurger: Function;
}

interface State {
  value: string;
}

export class BurgerForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  private handleChange(value: string) {
    this.setState({ value })
  }
  
  private bubbleUp() {
    console.log(this)
    console.log('bubbling up')
    this.props.newBurger(this.state.value);
    this.setState({ value: '' });
  }

  public render() {
    return (
      <div className={style.BurgerFormRoot}>
        <h1 style={{textAlign: 'center'}}>Eat some burgers</h1>
        <SearchBar
          hintText="New burger..."
          onChange={val => this.handleChange(val)}
          onRequestSearch={() => this.bubbleUp()}
          className={style.BurgerFormBar}
          style={{minWidth: '100%'}}
          value={this.state.value}
          searchIcon={null}
        />
      </div>
    )
  }

}
