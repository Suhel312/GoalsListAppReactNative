import { View, TextInput, Button, StyleSheet} from "react-native";

export default function GoalInput({isEditing, goalInputHandler, enteredGoalText, addGoalHandler}: any) {
    return(
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
