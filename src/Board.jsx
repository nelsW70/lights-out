import React, { Component } from 'react';
import { motion } from 'framer-motion';

import createBoard from './puzzleStore';
import Cell from './Cell';
import './Board.css';
import NeonButton from './NeonButton';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    onMountAnim: {
      container: {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            delayChildren: 1.5
          }
        }
      },
      item: {
        hidden: {
          opacity: 0,
          y: -50
        },
        show: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.8
        }
      }
    },
    youWinAnim: {
      container: {
        hidden: {
          opacity: 0,
          y: '-50%'
        },
        show: {
          opacity: 0.7,
          y: 0
        },
        transition: {
          duration: 0.8
        }
      }
    }
  };

  constructor(props) {
    super(props);

    //set initial state
    this.state = {
      hasWon: false,
      board: createBoard()
    };
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split('-').map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    // flip this cell and the cells around it
    flipCell(y, x); //Flip initial cell
    flipCell(y, x - 1); //flip left
    flipCell(y, x + 1); //flip right
    flipCell(y - 1, x); //flip below
    flipCell(y + 1, x); //flip above

    // win when every cell is turned off
    // determine is the game has been won
    let gameState = board.map(row => row.filter(cell => !cell)).flat().length;
    gameState >= 24
      ? this.setState({ hasWon: true })
      : this.setState({ hasWon: false });
    console.log(gameState);
  }

  /** Render game board or winning message. */
  makeTableCells() {
    let { ncols, nrows, onMountAnim } = this.props;
    let tblBoard = [];
    for (let y = 0; y < nrows; y++) {
      for (let x = 0; x < ncols; x++) {
        let coord = `${y}-${x}`;
        tblBoard.push(
          <Cell
            anim={onMountAnim.item}
            key={coord}
            isLit={this.state.board[y][x]}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        );
      }
    }
    return tblBoard;
  }

  handleRestartButton = evt => {
    setTimeout(() => {
      this.setState({
        hasWon: false,
        board: createBoard()
      });
    }, 1200);
  };

  render() {
    const { onMountAnim, youWinAnim } = this.props;
    return (
      <motion.div
        variants={onMountAnim.container}
        initial="hidden"
        animate="show"
      >
        {this.state.hasWon && (
          <motion.div variants={youWinAnim.container} className="winner">
            <span className="neon-orange">YOU</span>
            <span className="neon-blue">WIN!</span>
            <NeonButton
              label="Restart"
              handleClick={this.handleRestartButton}
            />
          </motion.div>
        )}
        {!this.state.hasWon && (
          <>
            <motion.div variants={onMountAnim.item} className="Board-title">
              <div className="neon-orange">Lights</div>
              <div className="neon-blue">Out</div>
            </motion.div>
            <div className="Board">{this.makeTableCells()}</div>
          </>
        )}
      </motion.div>
    );
  }
}

export default Board;
