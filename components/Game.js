import React from "react";
import Board from "./Board";
import { StyleSheet, Text, View, Button, FlatList, Platform } from "react-native";
import LinkList from "react-native/Libraries/NewAppScreen/components/LearnMoreLinks";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
      clickable: true,
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: +step,
      xIsNext: step % 2 === 0,
      history: this.state.history.slice(0, +step + 1),
      clickable: true,
    });
  }

  doNextMove() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    let i = findNextMove(squares, this.state.xIsNext);

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([{ squares: squares }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      clickable: true,
    });
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (!this.state.clickable || squares[i] || calculateWinner(squares)) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      clickable: false,
    });

    if (!calculateWinner(squares) && findEmptyIndexes(squares).length>0) {
      setTimeout(() => this.doNextMove(), 500);
    }
  }

  render() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];

    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    const moves = history
      .slice(0, history.length - 1)
      .map((move, step, arr) => {
        return {
          key: "" + step,
          desc: step ? "Go to move #" + step : "Go to game start",
        };
      });

    return (
      <View style={styles.game}>
        <Board
          style={styles.board}
          squares={current.squares}
          onPress={(i) => this.handleClick(i)}
        />
        <View style={styles.gameInfo}>
          <Text style={styles.gameInfoStatus}>{status}</Text>
          <FlatList
            style={styles.gameInfoMoves}
            data={moves}
            renderItem={({ item }) => (
              <View style={styles.gameInfoMovesContent}>
                <Button
                  width="100%"
                  color={Platform.OS === 'ios' ? 'white' : ''} 
                  onPress={() => this.jumpTo(item.key)}
                  title={item.desc}
                />
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function findNextMove(squares, xIsNext) {
  return strategyMove(squares);//randomMove(squares);
}

function randomMove(squares) {
  let nonEmptyIndexes = squares.filter((square) => square)
    .map((square, index) => index);
  let length = nonEmptyIndexes.length;
  let index = parseInt(Math.random() * (length - 1));
  return nonEmptyIndexes[index];
}

const defaultWeights = [
  1, 0, 1,
  0, 2, 0,
  1, 0, 1,
];

function strategyMove(squares, xIsNext) {
  let weights = defaultWeights.slice();

  squares.forEach((square, index) => {
    weights[index] = square ? -1 : weights[index];
  });
  

  let emptyIndexes = findEmptyIndexes(squares);

  //weight threat
  for (let index of emptyIndexes) {
    let simulateNextStep = squares.slice();
    simulateNextStep[index] = 'X';
    if (calculateWinner(simulateNextStep)) {
      weights[index] = weights[index] + 3;
    }
  }
  //weight win 
  for (let index of emptyIndexes) {
    let simulateNextStep = squares.slice();
    simulateNextStep[index] = 'O';
    if (calculateWinner(simulateNextStep)) {
      weights[index] = weights[index] + 6;
    }
  }

  let maxWeight = Math.max.apply(null, weights);

  console.log(maxWeight);
  return weights.findIndex((weight) => weight == maxWeight);
}

function findEmptyIndexes(squares) {
  return squares.map((square, index) => {if (!square) return index;})
  .filter(s => s || s==0)
}

const styles = StyleSheet.create({
  game: {
    width: "100%",
    flex: 1,
  },
  board: {
    flex: 1,
  },
  gameInfo: {
    backgroundColor: "gray",
    flex: 1,
  },
  gameInfoStatus: {
    fontSize: 24,
    alignContent: "center",
    textAlign: "center",
    color: "white",
  },
  gameInfoMoves: {
    flex: 1,
    color: "white",
    alignContent: "flex-start",
  },
  gameInfoMovesContent: {
    justifyContent: "space-between",
    alignContent: "flex-start",
    textAlign: "left",
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "green",
  },
});

export default Game;
