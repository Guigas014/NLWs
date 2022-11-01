import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#373D98',
    paddingTop: 24,
  },
  scroll: {
    paddingBottom: 50
  },
  picture: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 24,
    padding: 5,
    zIndex: 1
  },
  camera: {
    width: Dimensions.get("screen").width - 58,
    height: 300,
    zIndex: 2
  },
  player: {
    width: '100%',
    backgroundColor: '#FFF',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: '900',
    color: 'green',
    textTransform: 'uppercase'
  },
  sticker: {
    backgroundColor: '#373D98',
    zIndex: 0
  },
  retry: {
    color: '#FFF',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 22,
    marginBottom: 10
  }
});
