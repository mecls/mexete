import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";


const ScrollableSelector = (task: any) => {
  // List of options
  const options = ["15min", "30min","45min", "1h", "1h30", "2h"];

  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState("30min");

  // Function to handle selection
  const handleSelection = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.option,
              selectedOption === item && styles.selectedOption,
            ]}
            onPress={() => handleSelection(item)}
          >
            <ThemedText
              style={[
                styles.optionText,
                {
                  color: selectedOption === item ? "white" : "gray",
                  fontWeight: selectedOption === item ? 'bold' : 'normal',
                 // borderColor: selectedOption === item ? "white" : "black",
                },
              ]}
            >
              {item}
            </ThemedText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'flex-start',
  },
  option: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "transparent", // Default border color
    backgroundColor: "#363636",
  },
  selectedOption: {
    //borderColor: "#FF5C3D", // Border color for selected option
    borderColor: "white",
  },
  optionText: {
    fontSize: 16,
    color: "white",
  },
});

export default ScrollableSelector;
