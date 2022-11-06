import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo}
        source={require('./assets/InTune_Logo.png')}
        />
      <Text style={styles.title}>
      Share, Listen, Together
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E0E',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingscreen:{
    alignItems: 'flex-start',
    backgroundColor: '#0E0E0E',
    borderWidth: 1,
    borderRadius: 32,
    gap: 98,
    flexDirection: "column",
    height: 844,
    padding: 234 ,
    position: "relative",
    width: 390,
    display: 'flex',
    overflow: 'hidden',
  },
  title:{
    color: '#ce6ef2',
    fontSize: 24,
    fontWeight: '400',
    letterSpacing: 0,
    textAlign: 'center',
    width: 390,
  },
  logo:{
    height: 129,
    width: 315,
    border: 1,
    padding: 20,
    paddingVertical: 40,
    top: -50,
    bottom: '45%'
  }
});
