import React from 'react';
import { 
  StyleSheet, 
  View, 
  Alert, 
  Image, 
  TouchableHighlight,
  BackHandler,
 } from 'react-native';

import Status from './components/Status';
import MessageList from './components/MessageList';

import { 
  createTextMessage, 
  createImageMessage, 
  createLocationMessage } from './utils/MessageUtils';

export default class App extends React.Component {
  state = {
    fullscreenImageId: null,
    messages: [
      createImageMessage('https://picsum.photos/300/300'),
      createTextMessage('World'),
      createTextMessage('Hello'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
      }),
    ],
  };

  componentWillMount() {
    this.androidBackButton = BackHandler.addEventListener('hardwareBackPress', () => {
      const {fullscreenImage} = this.state;

      if (fullscreenImage) {
        this.dismissFullscreenImage();
        return true;
      }

      return false;
    });
  }

  componentWillUnmount() {
    this.androidBackButton.remove();
  }

  renderMessageList() {
    const {messages} = this.state;
    return (
      <View style={styles.content}>
          <MessageList
            onPressMessage={this.handlePressMessage}
            messages={messages}/>
        </View>
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

  dismissFullscreenImage = () => {
    this.setState({fullscreenImageId: null})
  }
  
  renderFullscreenImage = () => {
    const { messages, fullscreenImageId } = this.state;

    if (!fullscreenImageId) return null;

    const image = messages.find(message => message.id === fullscreenImageId);

    if (!image) return null;

    const { uri } = image;

    return (
      <TouchableHighlight 
        style={styles.fullscreenOverlay}
        onPress={this.dismissFullscreenImage}>
        <Image 
          style={styles.fullscreenImage}
          source={{uri}}/>
      </TouchableHighlight>
    );
  }

  handlePressMessage = ({id, type}) => {
    switch(type) {
      case 'text':
        Alert.alert(
          'Delete message?',
          'Are you sure you want to permanently delete this message?',
          [
            {
              text: 'Cancel', 
              style: 'cancel'
            },
            {
              text: 'Delete', 
              style: 'destructive',
              onPress: () => {
                const {messages} = this.state;
                this.setState({messages: messages.filter(m => m.id !== id)});
              }
            }
          ],
        );
        break;
      case 'image': 
        this.setState({fullscreenImageId: id})
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Status/>
        {this.renderMessageList()}
        {this.renderToolbar()}
        {this.renderInputMethodEditor()}
        {this.renderFullscreenImage()}
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
  fullscreenOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});
