import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../utils/Colors';

const ToDoList = props => {
  const {checkTodo, id, deleteTodo, todo} = props;

  return (
    <View style={styles.listTile}>
      <Icon
        name={todo.isCheck ? 'check-box' : 'check-box-outline-blank'}
        style={styles.leading}
        size={20}
        color={todo.isCheck ? Colors.main : Colors.white}
        onPress={() => checkTodo(id)}
      />
      <Text style={todo.isCheck ? styles.titleDecoration : styles.title}>
        {todo.title}
      </Text>
      <Icon
        name="delete"
        style={styles.trailing}
        size={20}
        color={Colors.main}
        onPress={() => deleteTodo(id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listTile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  leading: {
    width: '10%',
  },
  title: {
    fontSize: 18,
    color: Colors.white,
    flex: 1,
  },
  titleDecoration: {
    fontSize: 18,
    color: Colors.gray,
    flex: 1,
    textDecorationLine: 'line-through',
  },
  trailing: {
    width: '5%',
  },
});

export default ToDoList;
