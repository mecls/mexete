import React, { useRef, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Animated } from 'react-native';
import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox'; // Assuming this is the correct import for your Checkbox
import * as Haptics from 'expo-haptics';
import { ThemedText } from './ThemedText';
import Pagination from './Pagination';
import workouts from '../assets/data/workouts';

const { width } = Dimensions.get("screen");

const Workout = ({ workout, date }: { workout: any[], date: Date }) => {
  if (!date) {
    console.warn("Date is undefined!");
    return null;
  }
  // Get today's date once and set to midnight for comparison
  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);

  const todaysWorkouts = workout.filter((item) => {
    if (!item?.date) return false;
    
    const workoutDate = new Date(item.date);
    workoutDate.setHours(0, 0, 0, 0);
    
    // Compare timestamp values instead of individual date components
    return workoutDate.getTime() === todaysDate.getTime();
  });

  const [workoutChecks, setWorkoutChecks] = useState(workout?.map(() => false) ?? []);

  const toggleSubtask = (index: number) => {
    const updatedChecks = [...workoutChecks];
    updatedChecks[index] = !updatedChecks[index];
    setWorkoutChecks(updatedChecks);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  //Animated event
  const handleOnScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX,
          },
        },
      },
    ],
    { useNativeDriver: false }
  );

  const renderWorkoutItem = ({ item }: { item: any }) => (
    <View key={item.id && item.date} style={styles.container3}>
      <View style={{alignItems:'flex-start', marginRight:10}}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ThemedText type="title">{item.title || 'No title available'}</ThemedText>
          <Checkbox
            style={styles.checkbox}
            value={workoutChecks[item.id]}
            onValueChange={() => toggleSubtask(item.id)}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 5, marginTop: 5 }}>
          <LinearGradient
            colors={['#FF3131', '#FF9F31']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorder}
          >
            <FontAwesome name="arrow-right" size={12} color="white" />
          </LinearGradient>
          <ThemedText type="defaultSemiBold">{item.description.title || 'No title available'}</ThemedText>
        </View>
        <View style={styles.m_infoContainer}>
          <TouchableOpacity onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
            <FontAwesome5 name="info-circle" size={24} color="#636363" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (workout.length === 0) {
    return (
      <View style={styles.container2}>
        <View style={styles.subcontainer}>
          <Text>Workout</Text>
          <View style={styles.wBox2}>
            <View style={styles.pContainer_plus}>
              <TouchableOpacity onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                <AntDesign name="pluscircleo" size={24} color="#636363" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }


  const handleOnViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any }) => {
    if (viewableItems[0] && viewableItems[0].item && viewableItems[0].item.date) {
      const workoutDate = new Date(viewableItems[0].item.date);
      const today = new Date();
  
      if (
        workoutDate.getDate() === today.getDate() &&
        workoutDate.getMonth() === today.getMonth() &&
        workoutDate.getFullYear() === today.getFullYear()
      ) {
        setIndex(viewableItems[0]?.index); 
      }
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      <FlatList
        data={todaysWorkouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderWorkoutItem}
        contentContainerStyle={workout.length === 1 ? styles.singleContainer : styles.container}
        horizontal pagingEnabled snapToAlignment='center' showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll} 
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={{alignSelf:'center', marginTop:10}}>
      <Pagination workout={todaysWorkouts} scrollX={scrollX}/>
      </View>
    </View>
  );
};

export const MainWorkoutComponent = ({ workouts }: { workouts: any[] }) => (
  <SafeAreaView>
    <Workout workout={workouts} date={new Date()}/>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  
  container: {
    marginLeft:10,
    columnGap:70,
    justifyContent: 'space-between', // Spread items
  },
  hContainer_plus:{
  },
  container2: {
    flexDirection: 'row',
    marginRight:60,
  },
  container3: {
    flexDirection: 'column',
    alignItems:'flex-start',
  },
  wBox:{
  },
  gradientBorder: {
      borderRadius: 3, // Adjust for the image size + border width
      padding: 3, // Optional: adds padding around the image to show the gradient border
    },
  wBox2:{
      width:"100%",
      marginLeft:10,
      height:255,
    },
  subcontainer:{
    flex:4
  },
  infoContainer2:{
      alignSelf:'flex-start',
      position:'absolute',
      marginTop:60,
      marginLeft:40,
  },
  pContainer_plus:{
    alignSelf:'center',
    marginTop:100,
  },
  m_infoContainer:{
    alignSelf:'flex-end',
    position:'absolute',
    marginTop:225,
    paddingRight:5,
  },
  checkbox: {
    marginLeft: 10, // Add spacing between text and checkbox
    borderRadius: 5,
    padding:10,
  },
  singleContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
 
});

export default MainWorkoutComponent;
