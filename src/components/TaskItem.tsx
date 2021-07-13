import React, { useEffect, useRef, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/pen/pen.png'
import cancelIcon from '../assets/icons/cancel/cancel.png'

type Props = {
  item: Task
  index: number
  toggleTaskDone: (id: number) => void
  editTask: (id: number, newTaskTitle: string) => void
  removeTask: (id: number) => void
}

export default function TaskItem({ item, index, toggleTaskDone, editTask, removeTask }: Props) {

  const [editing, setEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(item.title)

  //a referencia é para voce manipular manualmente se o item está sendo editado ou não.
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setEditing(true)
  }

  function handleCancelEditing() {
    //cancela a edição e recupera o valor inicial do item
    setNewTitle(item.title)
    setEditing(false)
  }

  function handleSubmitEditing() {
    editTask(item.id, newTitle)
    setEditing(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (editing) {
        textInputRef.current.focus()
      } else {
        textInputRef.current.blur()
      }
    }
  }, [editing])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={newTitle}
            onChangeText={setNewTitle}
            editable={editing}
            onSubmitEditing={handleSubmitEditing}
            onBlur={handleSubmitEditing}
            ref={textInputRef}
          />

        </TouchableOpacity>
      </View>

      <View style={styles.iconsView}>
        {
          editing
            ?
            <TouchableOpacity
              testID={`edit-${index}`}
              onPress={() => handleCancelEditing()}
            >
              <Image source={cancelIcon} style={styles.xIcon} />
            </TouchableOpacity>
            :
            <TouchableOpacity
              testID={`edit-${index}`}
              onPress={() => handleStartEditing()}
            >
              <Image source={editIcon} style={styles.penIcon} />
            </TouchableOpacity>
        }
        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(item.id)}
          disabled={editing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  iconsView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  xIcon: {
    width: 15,
    height: 15
  },
  penIcon: {
    width: 21,
    height: 21
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})