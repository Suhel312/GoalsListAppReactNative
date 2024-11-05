import { View, Text, Button, StyleSheet } from 'react-native'

export default function GoalItem({ item, index, isEditing, editGoalHandler, deleteGoalhandler }: any) {
    return (
        <View style={styles.goalItem}>
            <View style={styles.textContainer}>
                <Text style={styles.goalText} numberOfLines={3} ellipsizeMode="tail">
                    {item.value}
                </Text>
            </View>
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