import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAtGoalHandler() {
    setModalIsVisible(true);
  }

  function endAtGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(currentCourseGoals => [
      ...courseGoals, 
      {text: enteredGoalText, id: Math.random().toString()},
    ]);
    endAtGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals .filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style = {'light'}/>
      <View style = {styles.appContainer}>
        <Button 
          title = 'Add a Goal' 
          color = "#a065ec" 
          onPress={startAtGoalHandler}
        />
        <GoalInput 
          visible = {modalIsVisible} 
          onAddGoal = {addGoalHandler} 
          onCancel = {endAtGoalHandler}
        />
        <View style = {styles.goalsContainter}>
          <FlatList 
            data = {courseGoals} 
            renderItem={itemData => {
              return (
                <GoalItem 
                  text = {itemData.item.text} 
                  id = {itemData.item.id}
                  onDeleteItem = {deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({

  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
    backgroundColor: '#253562'
  }, 
  goalsContainter: {
    flex: 5
  },
});