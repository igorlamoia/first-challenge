import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit1.png';
import cancelIcon from '../assets/icons/cancel/X.png';

import { Task, TasksListProps, FunctionsList } from './TasksList';

interface TaskItemProps extends FunctionsList {
  task: Task;
  index: number;
}

export const TaskItem = ({
  index,
  task,
  removeTask,
  toggleTaskDone,
  editTask,
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskOriginalTitle, setTaskOriginalTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);

  const handleStartEditing = () => {
    setIsEditing(true);
  };
  const handleSubmitEditing = () => {
    editTask(task.id, taskNewTitleValue);
    setIsEditing(false);
  };

  const handleCancelEditing = () => {
    setTaskNewTitleValue(taskOriginalTitle);
    setIsEditing(false);
  };

  useEffect(() => {
    if (textInputRef.current)
      if (isEditing) textInputRef.current.focus();
      else textInputRef.current.blur();
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
          disabled={isEditing}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>
          <TextInput
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            onChangeText={setTaskNewTitleValue}
            value={taskNewTitleValue}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.icons}>
        {isEditing ? (
          <TouchableOpacity onPress={() => handleCancelEditing()}>
            <Image source={cancelIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleStartEditing()}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
        <View style={styles.separacao} />
        <TouchableOpacity
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.3 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
  icons: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  separacao: {
    height: 24,
    width: 1,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 8,
  },
});
