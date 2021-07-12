import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    
    const data: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    
    //setas as tasks antigas mais a task nova no estado
    setTasks([...tasks, data])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({ ...task }))

    console.log('cheguei')
    console.log(updatedTasks)

    updatedTasks.filter(task => {
      if(task.id === id){
        task.done = !task.done
      }
    })

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    setTasks(task => task.filter(
      task => {
        if (task.id != id){
          return task
        }
      }
    ))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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