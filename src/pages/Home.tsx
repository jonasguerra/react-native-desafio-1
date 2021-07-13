import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    let alreadyExists

    alreadyExists = tasks.find(
      (task) => {
        if (task.title === newTaskTitle) {
          return true
        }
      })

    if (alreadyExists) {
      Alert.alert('Erro', 'Esta task já está cadastrada')
    } else {

      const data: Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
      //setas as tasks antigas mais a task nova no estado
      setTasks([...tasks, data])
    }
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({ ...task }))

    updatedTasks.filter(task => {
      if (task.id === id) {
        task.done = !task.done
      }
    })

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item?',
      'Tem certeza que você deseja remover esse item?',
      [
        { text: 'Ok', onPress: () => removeItem(id), style: 'default' },
        { text: 'Cancel', style: 'cancel' }
      ])
  }

  function removeItem(id: number){
    setTasks(task => task.filter(
      task => {
        if (task.id != id) {
          return task
        }
      }))
  }

  function handleEditTask(taskId: number, taskNewTitle: string){
    let editTasks = tasks.map(task => ({...task}))

    editTasks.filter((task) => {
      if (task.id === taskId){
        task.title = taskNewTitle
      }
    })
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})