import { Picker } from "@react-native-picker/picker";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

interface GoalInputProps {
    isEditing: boolean;
    goalInputHandler: (text: string) => void;
    enteredGoalText: string;
    addGoalHandler: () => void;
    categories: string[];
    selectedCategory: string;
    categoryChangeHandler: (category: string) => void;
}
const GoalInput: React.FC<GoalInputProps> = ({
    isEditing,
    goalInputHandler,
    enteredGoalText,
    addGoalHandler,
    categories,
    selectedCategory,
    categoryChangeHandler,
}) => {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.row}>
            <TextInput style={styles.textInput}
                placeholder='Enter your goal!'
                onChangeText={goalInputHandler}
                value={enteredGoalText}
            />
            <Picker 
            selectedValue={selectedCategory}
            style={styles.picker}
            onValueChange={categoryChangeHandler}
            >
                {categories.map((category) => (
                    <Picker.Item label={category} value={category} key={category} />
                ))}
            </Picker>
            </View>
            <View style={styles.button}>
            <Button
                    title={isEditing ? 'Update' : 'Add'}
                    onPress={addGoalHandler}
                />
            </View>

        </View>
    )
};
export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        marginBottom: 24,
        borderBottomWidth: 2,
        width: '100%',
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'white',
        width: '100%',
        padding: 8,
        marginBottom: 8,
    },
    picker: {
        width: '50%',
    },
    
    row: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: '80%',
    },
    button: {
        marginBottom: 8
    }

})
