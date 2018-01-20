import * as React from 'react';
import { Paper, IconButton, TextField } from 'material-ui';
import SearchIcon from 'material-ui/svg-icons/action/search'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import { grey500 } from 'material-ui/styles/colors'

const style = require('./style.css');

interface Props {
  readonly onSubmit?: Function;
  readonly style?: any;
}

interface State {
  isFocused: Boolean;
  isActive: Boolean;
  value: string;
}

export class TextBar extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      isFocused: false,
      isActive: false,
      value: '',
    };
  }

  private static $transition = 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)';

  private get isEmpty() { return this.state.value.length > 0 }

  private handleInput(value: string) {
    this.setState({ value });
  }

  private handleClear() {
    this.setState({ isActive: false, value: '' });
  }

  private handleKeyPressed(e) {
    if (e.charCode === 13) {
      this.bubbleUp();
    }
  }

  private handleSubmit() {
    this.bubbleUp();
  }

  private bubbleUp() {
    this.props.onSubmit(this.state.value);
  }

  render() {
    const { isEmpty } = this;

    return (
      <Paper className={style.TextBarRoot}>
        <div className={style.TextBarContainer}>
          <TextField
            fullWidth
            hintText="New burger"
            underlineShow={false}
            onChange={(_, v) => this.handleInput(v)}
            onKeyPress={e => this.handleKeyPressed(e)}
            className={style.TextBarTextField}
          />
        </div>
        <IconButton
          onClick={() => this.handleSubmit()}
          className={style.TextBarSubmitButton}
          style={{
            transition: TextBar.$transition,
            transform: isEmpty ? 'scale(1,1)' : 'scale(0,0)',
          }}
          iconStyle={{
            transition: TextBar.$transition,
            opacity: isEmpty ? 0 : 1,
          }}
        >
          <SearchIcon color={grey500} />
        </IconButton>
        <IconButton
          onClick={() => this.handleClear()}
          className={style.TextBarClearButton}
          style={{
            transition: TextBar.$transition,
            transform: isEmpty ? 'scale(0,0)' : 'scale(1,1)',
          }}
          iconStyle={{
            transition: TextBar.$transition,
            opacity: isEmpty ? 1 : 0,
          }}
        >
          <CloseIcon color={grey500} />
        </IconButton>
      </Paper>
    )
  }
}
