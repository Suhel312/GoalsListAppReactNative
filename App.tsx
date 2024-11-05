// import { StatusBar } from 'expo-status-bar';
import { SetStateAction, useState } from 'react';
import { StyleSheet, View, Alert, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
    const [enteredGoalText, setEnteredGoalText] = useState<string>('');
    const [coursgoals, setCoursGoals] = useState<{ key: string, value: string }[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editIndex, setEditEndex] = useState<number | null>(null);

    function goalInputHandler(enterdText: string) {
        setEnteredGoalText(enterdText)
    }

    function addGoalHandler() {
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

    function editGoalHandler(index: number) {
        setEnteredGoalText(coursgoals[index].value);
        setIsEditing(true);
        setEditEndex(index);
    }

    function deleteGoalhandler(index: number) {
        setCoursGoals(currentCourceGoals => currentCourceGoals.filter((_, i) => i !== index));
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.goalsContainer}>
                <GoalInput
                isEditing = {isEditing}
                goalInputHandler = {goalInputHandler}
                enteredGoalText = {enteredGoalText}
                addGoalHandler = {addGoalHandler}
                />
                <FlatList
                    data={coursgoals}
                    renderItem={({ item, index }) =>
                        <GoalItem
                        item = {item}
                        index = {index}
                        isEditing={isEditing}
                        editGoalHandler = {editGoalHandler}
                        deleteGoalhandler = {deleteGoalhandler}

                        />}
                    keyExtractor={(item) => item.key}
                />
            </View>
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
    
});