import { StyleSheet, SafeAreaView, View, Platform, TextInput } from 'react-native';
import { ThemedText } from '../../../components/ThemedText';
import Octicons from '@expo/vector-icons/Octicons';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import ScrollableSelector from '../../../components/ScrollableSelector';
const priorityData = [
  { label: 'Low', value: '3' },
  { label: 'Medium', value: '2' },
  { label: 'High', value: '1' },
];

const timeData = [
  { label: '15 min', value: '2' },
  { label: '30 min', value: '4' },
  { label: '45 min', value: '5' },
  { label: '1 hour', value: '6' },
  { label: '1.30 hours', value: '7' },
  { label: '2 hours', value: '8' },
];

// Utility function to get priority color
const getPriorityColor = (level: number | undefined) => {
  switch (level) {
    case 1:
      return '#FF3131'; // High priority - Red
    case 2:
      return '#FF9F31'; // Medium priority - Orange
    case 3:
      return '#31FF5E'; // Low priority - Green
    default:
      return '#636363'; // Default color - Grey
  }
};

export default function CreateTask() {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('1');
  const [date, setDate] = useState(new Date())

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Octicons name="tasklist" size={40} color="white" />
          <TextInput
            placeholder='Task name'
            placeholderTextColor='gray'
            style={styles.input}
          />
        </View>
        <View style={styles.priorityContainer}>
          <ThemedText style={{ marginBottom: 5, fontSize: 18, fontWeight: 'bold' }}>
            Priority level
          </ThemedText>
          <Dropdown
            style={[styles.dropdown, { borderColor: getPriorityColor(Number(value)) }]}
            data={priorityData}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : priorityData.find(item => item.value === value)?.label}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            value={value}
            onChange={item => {
              setValue(item.value);
              //console.log(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View style={styles.timeContainer}>
          <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>
            How long should it take?
          </ThemedText>
          <View style={{ flexDirection: 'row' }}>
          <ScrollableSelector />
          </View>
        </View>
        <View style={styles.dateContainer}>
          <ThemedText type='title' style={{ fontSize: 18, fontWeight: 'bold' }}>
            When should it be done?
          </ThemedText>
        </View>
        <View style={styles.dateContainer}>
          <ThemedText type='title' style={{ fontSize: 18, fontWeight: 'bold' }}>
           How often does it hapen?
          </ThemedText>
          <View >

          </View>
        </View>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  container: {
    flexDirection: 'column',
    gap: 20,
    paddingTop: 15,
  },
  inputContainer: {
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderBottomColor: 'white',
    padding: 5,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
    width: '100%',
    color: 'white',
  },
  priorityContainer: {

    marginLeft: 10,
    marginTop: 10,
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '40%',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  timeContainer: {
    flexDirection: 'column',
    marginLeft: 10,
    marginTop: 10,
  },
  dateContainer: {
    flexDirection: 'column',
    marginLeft: 10,
    marginTop: 10,
    color: 'white',
  },
});
