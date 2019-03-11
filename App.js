import React from 'react';
import { StyleSheet, View } from 'react-native';

import Status from './components/Status';
import MessageList from './components/MessageList';

import { 
  createTextMessage, 
  createImageMessage, 
  createLocationMessage } from './utils/MessageUtils';

export default class App extends React.Component {
  state = {
    messages: [
      createImageMessage('https://unsplash.it/300/300'),
      createTextMessage('World'),
      createTextMessage('Hello'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
      }),
    ],
  };
  renderMessageList() {
    return (
      <View style={styles.content}></View>
    )
  }

  renderInputMethodEditor() {
    return (
      <View style={styles.inputMethodEditor}></View>
    )
  }

  renderToolbar() {
    return (
      <View style={styles.toolbar}></View>
    )
  }

  render() {
    const {messages} = this.state;
    return (
      <View style={styles.container}>
        <Status/>
        <MessageList
          messages={messages}/>
        {this.renderMessageList()}
        {this.renderToolbar()}
        {this.renderInputMethodEditor()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
});
