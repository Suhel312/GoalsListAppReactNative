import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'

export default function GoalItem({ item, index, isEditing, editGoalHandler, deleteGoalhandler, showGoalDetails }: any) {
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
                    <Button title='Delete' onPress={() => deleteGoalhandler(index)} />
                )}
            </View>
        </View>
    )
};

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