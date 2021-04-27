import React from "react";
import { StyleSheet, View, Button, Text, TouchableHighlight } from 'react-native';


function Square(props) {
    return (
        <TouchableHighlight onPress={props.onPress} style={styles.square}>
            <Text style={styles.squareText}>{props.value}</Text>
        </TouchableHighlight>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return <Square
            value={this.props.squares[i]}
            onPress={(e) => this.props.onPress(i)}
            />;
    }

    render() {
        return (
            <View style={styles.board}>
                <View style={styles.boardRow}>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </View>
                <View style={styles.boardRow}>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </View>
                <View style={styles.boardRow}>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    square: {
        flex:1,
        flexDirection: 'row',
        backgroundColor:'orange',
        borderColor: 'gray',
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'stretch',
        textAlign: "center",
        paddingLeft: 30,
    },
    squareText: {
        fontSize: 96,
        color: 'white',
        width: '100%',
    },
    boardRow: {
        backgroundColor:'red',
        flexDirection: 'row',
        flex:1
    },
    board: {
        backgroundColor: 'green',
        height: 300,
        flex:1
    }


});

export default Board;