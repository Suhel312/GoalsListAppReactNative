// import { StatusBar } from 'expo-status-bar';
import { SetStateAction, useState } from 'react';
import { StyleSheet, View, Alert, FlatList, Modal, Text, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
    const [enteredGoalText, setEnteredGoalText] = useState<string>('');
    const [coursgoals, setCoursGoals] = useState<{ key: string, value: string }[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editIndex, setEditEndex] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedGoal, setSelectedGoal] = useState<{ key: string, value: string } | null>(null);

    const goalInputHandler = (enterdText: string) => {
        setEnteredGoalText(enterdText)
    }

    const addGoalHandler = () => {
        if (enteredGoalText.trim().length === 0) {
            Alert.alert('Invalid input', 'Goal cannot be empty!!!');
            return
        }

        if (isEditing && editIndex !== null) {
            const updateGoals = [...coursgoals];
            updateGoals[editIndex].value = enteredGoalText;
            setCoursGoals(updateGoals);
            setIsEditing(false)
            setEditEndex(null)
        } else {
            setCoursGoals(currentCourcegoals => [
                ...currentCourcegoals,
                { key: Math.random().toString(), value: enteredGoalText }
            ]);
        }
        setEnteredGoalText('');
    }

    const editGoalHandler = (index: number) => {
        setEnteredGoalText(coursgoals[index].value);
        setIsEditing(true);
        setEditEndex(index);
    }

    const deleteGoalHandler = (index: number) => {
        setCoursGoals(currentCourceGoals => currentCourceGoals.filter((_, i) => i !== index));
    }

    const showGoalDetails = (goal: { key: string; value: string }) => {
        setSelectedGoal(goal);
        setIsModalVisible(true);
    }

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedGoal(null);
    }

    return (
        <View style={styles.container}>

            <View style={styles.goalsContainer}>
                <GoalInput
                    isEditing={isEditing}
                    goalInputHandler={goalInputHandler}
                    enteredGoalText={enteredGoalText}
                    addGoalHandler={addGoalHandler}
                />
                <FlatList
                    data={coursgoals}
                    renderItem={({ item, index }) =>
                        <GoalItem
                            item={item}
                            index={index}
                            isEditing={isEditing}
                            editGoalHandler={editGoalHandler}
                            deleteGoalHandler={deleteGoalHandler}
                            showGoalDetails={showGoalDetails}
                        />}
                    keyExtractor={(item) => item.key}
                />
            </View>

            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modalConatainer}>
                    {selectedGoal && (
                        <>
                            <Text style={styles.modalText}>{selectedGoal.value}</Text>
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