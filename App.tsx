import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , SafeAreaView } from 'react-native';
import MoneyShare from './bmr';
import BMRCalculator from './bmr';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <BMRCalculator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 40,
  },
});
