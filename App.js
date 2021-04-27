import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Game from "./components/Game";

export default function App() {
    console.log("executed");
    return (
        <SafeAreaView style={styles.container}>
            <Game style={styles.content}/>
            <StatusBar  />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  content:{
    flex: 1,
  },

});
