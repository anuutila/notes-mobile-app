import * as React from 'react';
import { Text, View, Button, Alert, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './Styles';


const notelist = [
  {
    id:1,
    content: 'Note 1'
  },
  {
    id:2,
    content: 'Note 2'
  },
  {
    id:3,
    content: 'Note 3'
  },
]

class NoteList extends React.Component {
  state = {
    notes: notelist,
    newNote: ''
  }

  constructor(props) {
    super(props)
    this.getData()
  }

  getData = async () => {
    try {
        const data = await AsyncStorage.getItem('@notes')
        if (data !== null) {
          this.setState({ notes: JSON.parse(data) })
        } 

    } catch (err) {
        console.log(err)
    }
  }

  onSubmitEdit = async () => {
    if (this.state.newNote === '') {
      Alert.alert(
        'Error',
        'No empty notes allowed',
        [
          { text: 'OK', onPress: () => console.log('OK pressed') }
        ]
      );
      return
    }
    if (this.state.notes.filter(note => note.content === this.state.newNote).length > 0) {
      Alert.alert(
        'Error',
        'No duplicate notes allowed',
        [
          { text: 'OK', onPress: () => console.log('OK pressed') }
        ]
      );
      return
    }

    const noteObject = {
      id: this.state.notes.length + 1,
      content: this.state.newNote
    }

    const notelist = this.state.notes.concat(noteObject)
    try {
        const newData = JSON.stringify(notelist)
        await AsyncStorage.setItem('@notes', newData)
    } catch (err) {
        console.log(err)
    }
    
    this.setState({
      notes: notelist,
      newNote: ''
    })
  }

  handleNewNote = (text) => {
    this.setState({ newNote: text })
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.noteView}>
          {this.state.notes.map(note =>
            <Note
            key={note.id}
            content={note.content}
            id={note.id}
            />)}
        </View>  
        <Button title="siirry" 
          onPress={() => this.props.navigation.navigate(
            'Add note', {
              newNote: this.state.newNote, 
              handleNewNote: this.handleNewNote, 
              onSubmitEdit: this.onSubmitEdit
              }
          )} 
        />
      </ScrollView>
    )
  }
}

class NoteInputScreen extends React.Component {
  render() {
    return (
      <View style={styles.noteInputView}>
        <TextInput 
          placeholder="Write the note here" 
          onChangeText={this.props.route.params.handleNewNote}
          onSubmitEditing={this.props.route.params.onSubmitEdit}
          //value={this.props.route.params.newNote}
        />
        <Button style={styles.button} title="ADD NOTE" 
          onPress={this.props.route.params.onSubmitEdit}/>
      </View>
    )
  }  
}

const Note = (props) => {
  return (
    <View>
      <Text>{props.content}</Text>
    </View>
  )
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Notes">
        <Stack.Screen name="Notes" component={NoteList} />
        <Stack.Screen name="Add note" component={NoteInputScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;