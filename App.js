import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, Keyboard } from 'react-native';
import Task from './components/Task';

export default function App() {
  // Here task is name of state and setTask is the function which we will use to set this state
  const [task, setTask] = useState();

  /* This react hook is created because we want to store all the tasks that the user inputs in an array so that we can map over them and output them. Here the default value for useState() is an empty array */
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    // Automartically minimizes the keyboard
    Keyboard.dismiss();
    // code below puts out everything which was in TaskItem as an array then it appends the new task to it
    setTaskItems([...taskItems, task])
    // setTask is set to null to empty the TextInput after adding the task
    setTask(null);
  }

  // Fuction to delete task
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    // splice() removes selectd item from the array and store the result back in itemsCopy
    itemsCopy.splice(index, 1);
    // set state to itemsCopy which will not include the deleted task
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                  {/* Here we pass props to dynamically allot the text input from keyboard */}
                </TouchableOpacity>
              )
            })
          }

        </View>
      </View>

      {/* Write a Task */}
      {/* It is a component to solve the common problem of views that 
      need to move out of the way of the virtual keyboard. It can 
      automatically adjust either its height, position, or bottom 
      padding based on the keyboard height. */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "platform" : "height"}
        style={styles.writeTaskWrapper}
      >
        {/* For every change in text, onchangeText grabs the text and set the task to be that text   */}
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    padding: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
