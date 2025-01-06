import { StyleSheet, Animated, View, Dimensions } from 'react-native';
import React from 'react';

const { width } = Dimensions.get("window");

const Pagination = ({ workout, scrollX }: { workout: any[], scrollX: any}) => {
  return (
    <View style={styles.container}>
      {workout.map((_, idx) => { 
        // Use todaysWorkouts for mapping
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: 'clamp',
        });
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#636363', '#fff', '#636363'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[styles.dot, { width: dotWidth, backgroundColor }]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#636363',
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: '#000',
  },
});