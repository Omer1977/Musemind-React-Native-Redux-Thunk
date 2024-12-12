import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import SectionTitle from '../../components/ui/sectionTitle';
import TaskStatusCard from '../../components/dashboard/taskStatusCard';
import {defaultScreenStyle} from '../../styles/defaultScreenStyle';
import {VictoryPie, VictoryTheme} from 'victory-native';
import {ThemeColors} from '../../theme/colors';
import {statusTypes} from '../../utils/constants';

const Dashboard = () => {
  const {taskStatus, tasks} = useSelector(state => state?.tasks);

  const countTaskStatus = status => {
    return tasks.filter(item => item?.status === status).length;
  };

  const calculateTaskStats = status => {
    const totalTasks = tasks.length;
    const taskCount = tasks.filter(item => item?.status === status).length;
    const percentage = (taskCount / totalTasks) * 100;
    console.log(`Status: ${status}, Percentage: ${percentage}%`);
    return percentage;
  };

  console.log(tasks);

  return (
    <View style={defaultScreenStyle.container}>
      <ScrollView>
        <SectionTitle title={'Project Summary'} />
        <View style={styles.cards}>
          {taskStatus.map(item => (
            <TaskStatusCard
              value={countTaskStatus(item.status)}
              item={item}
              key={item.id}
            />
          ))}
        </View>
        <SectionTitle title={'Project Statistics'} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <VictoryPie
            style={{
              data: {
                fill: ({datum}) => {
                  // Her dilim için farklı renk atıyoruz.
                  const colors = [
                    ThemeColors.blue,
                    ThemeColors.pink,
                    ThemeColors.green,
                    ThemeColors.yellow,
                  ];
                  return colors[datum._x - 1]; // `datum._x` değeri dilimin sırasını temsil eder (1, 2, 3, ...).
                },
              },
              labels: {
                fontSize: 11,
                fill: ThemeColors.darkGray,
              },
            }}
            innerRadius={50}
            labelRadius={110}
            padAngle={1}
            width={320}
            height={320}
            data={[
              {
                x: 1,
                y: calculateTaskStats(statusTypes.INPROGRESS),
                label: 'In Progress',
              },
              {
                x: 2,
                y: calculateTaskStats(statusTypes.INREVIEW),
                label: 'In Review',
              },
              {
                x: 3,
                y: calculateTaskStats(statusTypes.COMPLETED),
                label: 'Completed',
              },
              {
                x: 4,
                y: calculateTaskStats(statusTypes.ONHOLD),
                label: 'On Hold',
              },
            ].filter(d => d.y > 0)}
            theme={VictoryTheme.clean}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default Dashboard;
