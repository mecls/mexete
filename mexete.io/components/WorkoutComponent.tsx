import React from 'react'
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import { ThemedText } from './ThemedText';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text } from 'react-native';
import tasks from '@/assets/data/workouts';


const { width } = Dimensions.get('window');

// const Workout = ({workout}:{workout:any[]})=>{

//     if (workout.length === 0) {
//           return (
//             <View style={styles.container2}>
//               <View style={styles.subcontainer}>
//               <Text>Workout</Text>
//               <View style={styles.wBox2}>
//                   <View style={styles.hContainer_plus}>
//                     <TouchableOpacity>
//                       <AntDesign name="pluscircleo" size={24} color="#636363" />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           );
//         } else if (workout.length === 1) {
//           return (
//             <View style={styles.container2}>
//               <View style={styles.subcontainer}>
//                 <Text>Workout</Text>
//                 <View style={styles.wBox2}>
//                   {/* Render single workout here */}
//                   <ThemedText>{workout[0]?.title || "No title available"}</ThemedText>
//                 </View>
//               </View>
//             </View>
//           );
//         } else if (workout.length === 2) {
//           return (
//             <>
//               {/* Render multiple workouts here */}
//               {workout.map((workoutItem) => (
//                 <View key={workoutItem.id}>
//                 {/* <ThemedText type="subtitle">Workout</ThemedText> */}
//                   {/* Render workout details for each item */}
//                   <View style={styles.wBox}>
//                      <ThemedText type='title'>{workoutItem.title ||  "No title available"}</ThemedText> {/* Example: Display the title of the first workout */}
//                   </View>
//                 </View>                
//               ))}
//             </>
//           );
//         } else {
//           // Handle unexpected case (optional)
//           return <Text>Unexpected number of workouts</Text>;
//         }
//       };
const Workout = ({ workout }: { workout: any[] }) => {
    if (workout.length === 0) {
      return (
        <View style={styles.container2}>
          <View style={styles.subcontainer}>
            <Text>Workout</Text>
            <View style={styles.wBox2}>
              <TouchableOpacity>
                <AntDesign name="pluscircleo" size={24} color="#636363" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else if (workout.length === 1) {
      return (
        <View style={styles.container2}>
          <View style={styles.subcontainer}>
            <Text>Workout</Text>
            <View style={styles.wBox2}>
              <Text>{workout[0]?.title || 'No title available'}</Text>
            </View>
          </View>
        </View>
      );
    } else if (workout.length >= 2) {
      return (
        <View style={styles.container}>
          {workout.map((workoutItem) => (
            <View key={workoutItem.id} style={styles.wBox}>
              <ThemedText type='title'>{workoutItem.title || 'No title available'}</ThemedText>
            </View>
          ))}
        </View>
      );
    } else {
      return <Text>Unexpected number of workouts</Text>;
    }
  };
  
     

export const WorkoutComponent = ({ workouts }: { workouts: any[] })=>{

  return (
   
        <SafeAreaView style={styles.mainContainer}>
                <Workout workout={workouts}/>
            <View style={styles.stats_container}>
                <View style={styles.subcontainer3}>
                <ThemedText type='title'>Week Stats</ThemedText>
                     <View style={styles.mBox}>
                        <ThemedText type='default'>After you start using the app this will update automaticly.</ThemedText>
                        <View style={styles.m_infoContainer}>
                            <TouchableOpacity>
                            {/* <FontAwesome5 name="info-circle" size={24} color="#636363" /> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>   
            </View>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    mainContainer:{
      flex:1,
      alignItems:'center',
      flexDirection:'column',
      marginTop:10,
    },
    container: {
      flexDirection: 'row',
      paddingTop:10,
      gap:15,
    },
    hContainer_plus:{
        alignSelf:'center',
        marginTop:100,
      },
    container2: {
      },
    stats_container: {
        flexDirection: 'row',
        marginTop:15,
      },
    wBox:{
      width:width*0.45,
      height:255,
      marginTop:5,
      padding:10,
      position:'static',
      alignSelf:'flex-start',
      backgroundColor:'#202020',
      borderCurve:'continuous',
      borderRadius:20,
      alignItems:'flex-start',
    },
    wBox2:{
        width:width*0.45,
        marginLeft:10,
        height:255,
        marginTop:5,
        padding:10,
        position:'static',
        alignSelf:'flex-end',
        backgroundColor:'#202020',
        borderCurve:'continuous',
        borderRadius:20,
        alignItems:'flex-start',
      },
    mBox:{
        width:width*0.95,
        height:200,
        marginTop:5,
        padding:10,
        marginRight:5,
        position:'static',
        alignSelf:'flex-start',
        backgroundColor:'#202020',
        borderCurve:'continuous',
        borderRadius:20,
    },
    subcontainer:{
      flex:4
    },
    subcontainer3:{
      flex:1,
    },
    infoContainer:{
      alignSelf:'flex-end',
      position:'absolute',
      marginTop:120,
      paddingRight:5,
    },
    pContainer_plus:{
      alignSelf:'center',
      marginTop:100,
    },
    m_infoContainer:{
      alignSelf:'flex-end',
      position:'absolute',
      marginTop:170,
      paddingRight:5,
    },
  });
