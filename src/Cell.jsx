import React, { Component } from 'react';
import { motion } from 'framer-motion';

import './Cell.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    // call up to the board to flip cells around this cell
    this.props.flipCellsAroundMe();
  }

  render() {
    const { isLit, anim } = this.props;
    let classes = 'Cell' + (isLit ? ' Cell-lit' : '');

    return (
      <motion.div
        initial={anim.hidden}
        animate={anim.show}
        transition={isLit ? { delay: 1 } : { delay: 0.5 }}
        className={classes}
        onClick={this.handleClick}
      />
    );
  }
}

export default Cell;
