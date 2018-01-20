import * as React from 'react';
import axios from 'axios';
import { List, ListItem, Avatar } from 'material-ui';

import { BurgerForm } from 'components';

const style = require('./style.css');

interface State {
  items: any[];
}

export class Home extends React.Component<any, State> {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  public render() {
    return (
      <div className={style.HomeRoot}>
        <BurgerForm newBurger={this.newBurger.bind(this)} />
        <List style={{ width: 600 }}>
          {this.state.items.map((item, i) => 
          <ListItem
            style={{ textAlign: 'right' }}
            onClick={() => this.eatBurger(i)}
            primaryText={item.burgerName}
            leftIcon={<Avatar src="/public/burger.png" key={i} size={30} />} 
          />
        )}
        </List>
      </div>
    )
  }

  async componentDidMount() {
    const { data } = await axios.get('/api/burgers');
    this.setState({ items: data.filter(i => !i.isDevoured) });
  }

  private async eatBurger(i) {
    const { items } = this.state;
    const item = items[i]
    items.splice(i, 1);
    this.setState({ items })

    await axios.put(`/api/burgers/${item.id}`, { isDevoured: true });
  }

  public async newBurger(burgerName) {
    const newItem: any = { burgerName }
    this.setState({ items: [...this.state.items, newItem] })

    await axios.post('/api/burgers', newItem)
  }

}
