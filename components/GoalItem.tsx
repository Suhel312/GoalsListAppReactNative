import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'

interface GoalItemProps {
    item: {key: string; value: string, category: string};
    index: number;
    isEditing: boolean;
    editGoalHandler: (index: number) => void;
    deleteGoalHandler: (index: number) => void;
    showGoalDetails: (goal: {key: string; value: string, category: string}) => void;
}

const GoalItem: React.FC<GoalItemProps> = ({
    item,
    index,
    isEditing,
    editGoalHandler,
    deleteGoalHandler,
    showGoalDetails,
}) => {
    return (
        <View style={styles.goalItem}>
            <TouchableOpacity onPress={() => showGoalDetails(item)} style={styles.textContainer}>
                <Text style={styles.goalText} numberOfLines={3} ellipsizeMode="tail">
                    {item.value}
                </Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <Button title='Edit' onPress={() => editGoalHandler(index)} />
                {!isEditing && (
                    <Button title='Delete' onPress={() => deleteGoalHandler(index)} />
                )}
            </View>
        </View>
    )
};

export default GoalItem

const styles = StyleSheet.create({
    goalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        marginBottom: 8,
    },
    textContainer: {
        flex: 1,
        marginRight: 8,
    },
    goalText: {
        flexWrap: 'wrap'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '40%'
    },
})