import { StyleSheet, SafeAreaView, Button, View, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Link} from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Avatar } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Uni Exercises',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Plan App',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Run',
  },
  {
    id: '58694a0f-2la1-471f-bd96-145571e29d72',
    title: 'Trash Out',
  },
];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.fl_subContainer} >
    <ThemedText type='subtitle'>{title}</ThemedText>
  </View>
);

export default function TasksScreen() {

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container} >
        <ThemedText style={{alignSelf:'center', paddingTop:5}} type="title">Today</ThemedText>
        <View style={styles.flContainer}>
          <FlatList
          data={DATA}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
        </View>
        <View style={styles.footer}>
          <View style={styles.all_box} >
              <TouchableOpacity  >
                <Link href={'/viewAll'} onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                  <ThemedText type='defaultSemiBold'>View All</ThemedText>
                </Link>
              </TouchableOpacity>
            </View>
              <TouchableOpacity>
             <Link href={'/createTask'} onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
              <AntDesign name="pluscircleo" size={55} color="white" />
             </Link>
             </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    padding:10,
    margin:10,
    alignItems:'center',
    flexDirection:'column',
  },
  container: {
    flex:1,
    flexDirection: 'column',
    gap: 20, 
    paddingTop:15,
  },
  fl_subContainer:{
    margin:10,
    padding:15,
    backgroundColor:'#202020',
    borderRadius:20,
    width:width*0.9,
    height:125,
  },
  flContainer: {
    flex:8,
    flexDirection: 'column',
  },
  footer:{
    flex:2,
    marginBottom:25,
    marginTop:-30,
    padding:20,
    flexDirection: 'row',
    alignItems:'center',
    gap:width*0.4,
  },
  all_box:{
    backgroundColor:'#636363',
    borderRadius:10,
    width:width*0.25,
    height:45,
    fontWeight:'300',
    alignItems:'center',
    padding:10,
  },
});
