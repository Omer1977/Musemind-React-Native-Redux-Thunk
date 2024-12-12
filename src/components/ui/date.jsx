import React, {useState} from 'react';
import DatePicker from 'react-native-modern-datepicker';

const DateInput = () => {
  const [date, setDate] = useState(new Date());

  return <DatePicker date={date} onDateChange={setDate} />;
};

export default DateInput;
