import { View, TextInput, Button, StyleSheet } from "react-native";

interface GoalInputProps {
    isEditing: boolean;
    goalInputHandler: (text: string) => void;
    enteredGoalText: string;
    addGoalHandler: () => void;
}
const GoalInput: React.FC<GoalInputProps> = ({
    isEditing,
    goalInputHandler,
    enteredGoalText,
    addGoalHandler,
}) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.textInput}
                placeholder='Enter your goal!'
                onChangeText={goalInputHandler}
                value={enteredGoalText}
            />
            <Button title={isEditing ? 'Update' : 'Add'} onPress={addGoalHandler} />
        </View>
    )
};
export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        borderBottomWidth: 2,
        borderBottomColor: 'white'
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'white',
        width: '80%',
        padding: 8,
        marginRight: 8,
        marginBottom: 4
    },
})
