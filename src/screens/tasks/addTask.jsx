import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {defaultScreenStyle} from '../../styles/defaultScreenStyle';
import Button from '../../components/ui/button';
import Input from '../../components/ui/input';
import {useDispatch} from 'react-redux';
import {addNewTask} from '../../store/actions/taskActions';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ThemeColors} from '../../theme/colors';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [status, setStatus] = useState(''); // Status için state
  const [dateComplete, setDateComplete] = useState(false); // Tarih tamamlandı mı?

  const statuses = ['In Progress', 'In Review', 'On Hold', 'Completed']; // Status listesi

  const dispatch = useDispatch();

  const saveTask = () => {
    const task = {
      id: Date.now(),
      title: title,
      status: status,
      date: date.toISOString().split('T')[0],
    };

    dispatch(addNewTask(task));
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
    setDateComplete(false); // Tarih tamamlanmadı
  };

  const hideDatePicker = () => {
    if (dateComplete) {
      setDatePickerVisible(false);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // Eğer gün, ay ve yıl tamamlanmışsa
    if (event.type === 'set') {
      setDate(currentDate);
      setDateComplete(true); // Tarih tamamlandı
    } else {
      setDate(currentDate); // Tarih değişiyor
    }
  };

  const getStatusColor = status => {
    switch (status) {
      case 'In Progress':
        return ThemeColors.blue;
      case 'In Review':
        return ThemeColors.pink;
      case 'On Hold':
        return ThemeColors.yellow;
      case 'Completed':
        return ThemeColors.green;
      default:
        return '#B7B7B7'; // Default border color when no status is selected
    }
  };

  return (
    <View style={defaultScreenStyle.container}>
      <Input
        onChangeText={value => setTitle(value)}
        value={title}
        placeholder="Please enter a title"
        title="Task Title"
      />
      <TouchableOpacity onPress={showDatePicker} style={styles.dateInput}>
        <Text
          style={{
            color: isDatePickerVisible ? 'black' : '#B7B7B7',
            fontSize: 16,
          }}>
          {isDatePickerVisible ? date.toDateString() : 'Please select a date'}
        </Text>
      </TouchableOpacity>

      {isDatePickerVisible && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}

      <Text style={styles.sectionTitle}>Select Task Status</Text>
      {statuses.map(item => (
        <TouchableOpacity
          key={item}
          style={styles.radioButton}
          onPress={() => setStatus(item)} // Status seçimi
        >
          <View
            style={[
              styles.circle,
              {
                borderColor: getStatusColor(item),
                backgroundColor:
                  status === item ? getStatusColor(item) : 'transparent',
              },
            ]}
          />
          <Text style={styles.radioText}>{item}</Text>
        </TouchableOpacity>
      ))}

      <Button onPress={() => saveTask()} title="Save" status="success" />
    </View>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: ThemeColors.input,
    paddingVertical: 15,
    margin: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'transparent',
    marginRight: 10,
    borderColor: 'transparent',
  },

  radioText: {
    fontSize: 16,
  },
});

export default AddTask;
