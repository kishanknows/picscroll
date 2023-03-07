import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

const SideMenu = props => {
  const [activeIndex, setActiveIndex] = useState(1);
  return (
    <Modal
      isVisible={props.route.params?.showMenu}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      onBackdropPress={() => props.navigation.setParams({showMenu: false})}
      style={{margin: 0}}>
      <View style={styles.container}>
        <Text style={styles.sideMenuHeader}>Contents</Text>
        <TouchableOpacity
          style={
            activeIndex === 1 ? styles.activeMenuItem : styles.inactiveMenuItem
          }
          onPress={() => {
            props.setTab(1);
            setActiveIndex(1);
          }}>
          <Text
            style={
              activeIndex === 1
                ? styles.activeMenuItemText
                : styles.inactiveMenuItemText
            }>
            Community
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            activeIndex === 2 ? styles.activeMenuItem : styles.inactiveMenuItem
          }
          onPress={() => {
            props.setTab(2);
            setActiveIndex(2);
          }}>
          <Text
            style={
              activeIndex === 2
                ? styles.activeMenuItemText
                : styles.inactiveMenuItemText
            }>
            Cats
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            activeIndex === 3 ? styles.activeMenuItem : styles.inactiveMenuItem
          }
          onPress={() => {
            props.setTab(3);
            setActiveIndex(3);
          }}>
          <Text
            style={
              activeIndex === 3
                ? styles.activeMenuItemText
                : styles.inactiveMenuItemText
            }>
            Dogs
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '70%',
    backgroundColor: 'white',
    paddingTop: 15,
  },
  sideMenuHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 15,
    marginBottom: 20,
  },
  activeMenuItem: {
    height: 40,
    backgroundColor: '#f6eff6',
    marginTop: 20,
    borderRadius: 6,
    justifyContent: 'center',
  },
  activeMenuItemText: {
    color: '#492849',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 15,
  },
  inactiveMenuItemText: {
    color: 'grey',
    fontSize: 15,
    marginLeft: 15,
  },
  inactiveMenuItem: {
    height: 40,
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 6,
    justifyContent: 'center',
  },
});

export default SideMenu;
