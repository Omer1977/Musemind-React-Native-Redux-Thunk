import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {ThemeColors} from '../../theme/colors';
import {Calendar, Edit, Trash} from 'iconsax-react-native';
import {setColor} from '../../utils/functions';
import {useDispatch} from 'react-redux';
import {deleteTask} from '../../store/actions/taskActions';
import {useNavigation} from '@react-navigation/native';
import {UPDATETASK} from '../../utils/routes';

const TaskItem = ({item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const deleteItem = () => {
    Alert.alert('Warning', 'Are you sure you want to delete the task?', [
      {
        text: 'Delete',
        onPress: () => dispatch(deleteTask(item.id)),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'space-around'}}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View>
          <View
            style={{
              backgroundColor: setColor(item.status),
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
              borderRadius: 20,
              width: 100,
            }}>
            <Text style={{color: ThemeColors.white, fontWeight: '500'}}>
              {item.status}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Calendar size="20" color={ThemeColors.black} />
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity style={{marginHorizontal: 10}} onPress={deleteItem}>
          <Trash size="25" color={ThemeColors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(UPDATETASK, {task: item})}>
          <Edit size="25" color={ThemeColors.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: ThemeColors.darkGray,
    marginVertical: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 150,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  date: {
    marginLeft: 8,
  },
});

export default TaskItem;
