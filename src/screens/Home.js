import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import {TextInput} from 'react-native-paper';
import {Colors} from '../utils/Colors';
import ToDoList from '../components/ToDoList';

let toDoData = [
  {id: 1, title: 'Pick up grand ma', isCheck: false},
  {id: 2, title: 'Wash my clothes', isCheck: false},
  {id: 3, title: 'Go to park', isCheck: false},
  {id: 4, title: 'test1', isCheck: false},
  {id: 5, title: 'test2', isCheck: false},
];

const bottomData = [
  {id: 1, title: 'All'},
  {id: 2, title: 'Completed'},
  {id: 3, title: 'Remaining'},
];
const Home = () => {
  const [text, setText] = useState('');
  const [bottomIndex, setBottomIndex] = useState(0);
  const [todos, setTodos] = useState(toDoData);
  const [searchValue, setSearchValue] = useState('');
  const [enableTextField, setEnableTextField] = useState(false);

  const checkTodo = id => {
    const newData = toDoData.map(todo => {
      if (todo.id === id) {
        todo.isCheck = !todo.isCheck;
      }
      return todo;
    });
    setTodos(newData);
  };

  const deleteTodo = id => {
    toDoData = toDoData.filter(todo => {
      return todo.id !== id;
    });
    setTodos(toDoData);
  };

  const addTodo = () => {
    if (searchValue.length > 0) {
      toDoData.push({
        id: toDoData.length + 1,
        title: searchValue,
        isCheck: false,
      });
      setTodos(toDoData);
      setSearchValue('');
      setEnableTextField(false);
    }
  };

  const addItem = text => {
    setSearchValue(text);
  };

  const searchFunction = text => {
    const updatedData = toDoData.filter(item => {
      const item_data = `${item.title.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setSearchValue(text);
    setTodos(updatedData);
  };

  return (
    <View style={styles.container}>
      <Header title={'To Do List'} />
      <View style={styles.subContainer}>
        <TextInput
          label=""
          mode={'outlined'}
          placeholder={enableTextField ? 'Add Item' : 'Search...'}
          outlineColor={Colors.main}
          activeOutlineColor={Colors.main}
          onChangeText={enableTextField ? addItem : searchFunction}
          value={searchValue}
          right={
            enableTextField && (
              <TextInput.Icon
                name="check"
                color={Colors.main}
                onPress={addTodo}
              />
            )
          }
          theme={{
            roundness: 5,
            colors: {
              placeholder: Colors.white,
              text: Colors.white,
              primary: Colors.main,
              underlineColor: Colors.main,
              background: Colors.transparent,
            },
          }}
        />
        <View style={styles.centerContainer}>
          <ScrollView
            style={{flex: 1, paddingTop: 15}}
            showsVerticalScrollIndicator={false}>
            {todos
              .sort((x, y) => x.id < y.id)
              .map((todo, index) => (
                <View key={index}>
                  <ToDoList
                    id={todo.id}
                    todo={todo}
                    checkTodo={checkTodo}
                    deleteTodo={deleteTodo}
                  />
                </View>
              ))}
          </ScrollView>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomSubContainer}>
            <TouchableOpacity
              style={styles.touchOpacityView}
              onPress={() => setEnableTextField(true)}>
              <Image
                source={require('../assets/image/pluse.png')}
                style={styles.plusImg}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.touchOpacityView, {paddingHorizontal: 30}]}>
              <Text
                style={
                  styles.bottomItemText
                }>{`${toDoData.length} Items`}</Text>
            </TouchableOpacity>
            <View style={styles.tabView}>
              {bottomData.map((item, index) => (
                <>
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setBottomIndex(index);
                      if (index === 0) {
                        setTodos(toDoData);
                      } else if (index === 1) {
                        const newData = toDoData.filter(todo => {
                          return todo.isCheck;
                        });
                        setTodos(newData);
                      } else if (index === 2) {
                        const newData = toDoData.filter(todo => {
                          return !todo.isCheck;
                        });
                        setTodos(newData);
                      }
                    }}>
                    <Text style={styles.bottomItemText}>{item.title}</Text>
                  </TouchableOpacity>
                  {!(bottomData.length - 1 === index) && (
                    <View style={styles.divider} />
                  )}
                </>
              ))}
            </View>
          </View>
          <View
            style={[
              styles.dotView,
              bottomIndex == 0
                ? {width: '51%'}
                : bottomIndex == 1
                ? {width: '35%'}
                : bottomIndex == 2
                ? {width: '12%'}
                : {width: '50%'},
            ]}>
            {bottomIndex == 0 && <View style={styles.dot} />}
            {bottomIndex == 1 && <View style={styles.dot} />}
            {bottomIndex == 2 && <View style={styles.dot} />}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  subContainer: {
    paddingTop: 15,
    width: '95%',
    alignSelf: 'center',
    flex: 1,
  },
  centerContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 0.1,
    backgroundColor: Colors.main,
    width: '110%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  plusImg: {
    height: 25,
    width: 25,
    alignSelf: 'center',
  },
  bottomSubContainer: {
    flexDirection: 'row',
    width: '92%',
    alignSelf: 'center',
    flex: 1,
  },
  bottomItemText: {
    fontWeight: '500',
    fontSize: 16,
    color: Colors.black,
    paddingTop: 5,
    paddingBottom: 5,
  },
  touchOpacityView: {
    alignSelf: 'center',
  },
  tabView: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: Colors.black,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    flex: 1,
    borderRadius: 20,
  },
  divider: {
    height: 30,
    width: 1,
    backgroundColor: Colors.black,
  },
  dot: {
    height: 5,
    width: 5,
    backgroundColor: Colors.black,
    borderRadius: 5,
  },
  dotView: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderColor: Colors.black,
    //width: '12%',
    marginRight: 22,
    marginBottom: 5,
  },
});

export default Home;
