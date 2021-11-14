import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (newTaskTitle: string) => {
    const newTasks = [
      ...tasks,
      {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      },
    ];
    if (tasks.some((task) => task.title == newTaskTitle))
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
        [
          {
            text: 'belezinha!',
            style: 'cancel',
          },
        ]
      );
    else setTasks(newTasks);
  };

  const handleToggleTaskDone = (id: number) => {
    const newTasks = tasks.map((task) => {
      if (task.id == id) task.done = !task.done;
      return task;
    });
    setTasks(newTasks);
  };

  const handleRemoveTask = (id: number) => {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Sim',
          onPress: () => setTasks(tasks.filter((task) => task.id != id)),
        },
        {
          text: 'Não',
          style: 'cancel',
        },
      ]
    );
  };

  const handleEditTask = (taskId: number, taskEdited: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) task.title = taskEdited;
      return task;
    });
    setTasks(newTasks);
  };

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
