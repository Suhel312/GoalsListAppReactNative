// import { StatusBar } from 'expo-status-bar';
import React, { SetStateAction, useState } from 'react';
import { StyleSheet, View, Alert, FlatList, Modal, Text, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { Picker } from '@react-native-picker/picker';

const catergories = ['All', 'Work', 'Personal', 'Health'];

const App: React.FC = () => {
    const [enteredGoalText, setEnteredGoalText] = useState<string>('');
    const [coursgoals, setCoursGoals] = useState<{ key: string, value: string, category: string }[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editIndex, setEditEndex] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedGoal, setSelectedGoal] = useState<{ key: string, value: string, category: string } | null>(null);
    const [goalCategory, setGoalCategory] = useState<string>(catergories[1])
    const [selectedCategory, setSelectedCategory] = useState<string>('All')

    const goalInputHandler = (enterdText: string) => {
        setEnteredGoalText(enterdText)
    }

    const categoryChangeHandler = (category: string) => {
        setGoalCategory(category);
    }

    const addGoalHandler = () => {
        if (enteredGoalText.trim().length === 0) {
            Alert.alert('Invalid input', 'Goal cannot be empty!!!');
            return;
        }

        if (isEditing && editIndex !== null) {
            const updatedGoals = [...coursgoals];
            updatedGoals[editIndex] = { ...updatedGoals[editIndex], value: enteredGoalText, category: goalCategory };
            setCoursGoals(updatedGoals);
            setIsEditing(false);
            setEditEndex(null);
        } else {
            setCoursGoals((currentCourcegoals) => [
                ...currentCourcegoals,
                { key: Math.random().toString(), value: enteredGoalText, category: goalCategory },
            ]);
        }
        setEnteredGoalText('');
    }

    const editGoalHandler = (index: number) => {
        const goal = coursgoals[index];
        setEnteredGoalText(goal.value);
        setGoalCategory(goal.category);
        setIsEditing(true);
        setEditEndex(index);
    }

    const deleteGoalHandler = (index: number) => {
        setCoursGoals((currentGoals) => currentGoals.filter((_, i) => i !== index));
    }

    const showGoalDetails = (goal: { key: string; value: string, category: string }) => {
        setSelectedGoal(goal);
        setIsModalVisible(true);
    }

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedGoal(null);
    }
    const filteredGoals = selectedCategory === 'All'
        ? coursgoals
        : coursgoals.filter((goal) => goal.category === selectedCategory);

    return (
        <View style={styles.container}>
            <View style={styles.goalsContainer}>
                <GoalInput
                    isEditing={isEditing}
                    goalInputHandler={goalInputHandler}
                    enteredGoalText={enteredGoalText}
                    addGoalHandler={addGoalHandler}
                    categories={catergories}
                    selectedCategory={goalCategory}
                    categoryChangeHandler={categoryChangeHandler}
                />
                <Picker
                    selectedValue={selectedCategory}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                >
                    {catergories.map((category) => (
                        <Picker.Item label={category} value={category} key={category} />
                    ))}
                </Picker>
                <FlatList
                    data={filteredGoals}
                    renderItem={({ item, index }) => (
                        <GoalItem
                            item={item}
                            index={index}
                            isEditing={isEditing}
                            editGoalHandler={editGoalHandler}
                            deleteGoalHandler={deleteGoalHandler}
                            showGoalDetails={showGoalDetails}
                        />
                    )}
                    keyExtractor={(item) => item.key}
                />
            </View>

            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modalConatainer}>
                    {selectedGoal && (
                        <>
                            <Text style={styles.modalText}>{selectedGoal.value} ({selectedGoal.category})</Text>
                            <Button title='Close' onPress={closeModal} />
                        </>
                    )}
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        paddingHorizontal: 16
    },
    goalsContainer: {
        flex: 5
    },
    picker: {
        marginVertical: 10,
        width: '100%'
    },
    modalConatainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
        color: 'black'
    },
});

export default App;