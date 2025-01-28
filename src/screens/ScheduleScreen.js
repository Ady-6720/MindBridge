import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Portal, 
  Modal, 
  FAB, 
  IconButton, 
  Avatar,
  Divider,
  Switch,
  TextInput,
  List
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyledCard } from '../components/StyledCard';
import { StyledText } from '../components/StyledText';
import { StyledButton } from '../components/StyledButton';
import { colors, spacing, shapes, shadows } from '../config/theme';

const ScheduleScreen = () => {
  const [schedules, setSchedules] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [newActivity, setNewActivity] = useState({
    title: '',
    time: '',
    duration: '30',
    type: 'task', // task, break, meal, therapy, etc.
    icon: 'calendar-blank',
    notes: '',
    visualSupport: true,
    reminder: true,
  });

  // Predefined activity types with icons and colors
  const activityTypes = [
    { label: 'Task', value: 'task', icon: 'checkbox-marked-outline', color: colors.primary },
    { label: 'Break', value: 'break', icon: 'coffee', color: colors.accent1 },
    { label: 'Meal', value: 'meal', icon: 'food', color: colors.accent2 },
    { label: 'Therapy', value: 'therapy', icon: 'heart', color: colors.tertiary },
    { label: 'Exercise', value: 'exercise', icon: 'run', color: colors.success },
    { label: 'Social', value: 'social', icon: 'account-group', color: colors.focus },
    { label: 'Learning', value: 'learning', icon: 'book-open-variant', color: colors.memory },
    { label: 'Relaxation', value: 'relaxation', icon: 'meditation', color: colors.planning },
  ];

  // Time slots for the day
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const addActivity = () => {
    if (!newActivity.title || !newActivity.time) return;

    const activity = {
      id: Date.now().toString(),
      ...newActivity,
      completed: false,
    };

    setSchedules([...schedules, activity]);
    setModalVisible(false);
    resetNewActivity();
  };

  const resetNewActivity = () => {
    setNewActivity({
      title: '',
      time: '',
      duration: '30',
      type: 'task',
      icon: 'calendar-blank',
      notes: '',
      visualSupport: true,
      reminder: true,
    });
  };

  const TimeSlotCard = ({ time, activities }) => {
    const currentHour = new Date().getHours();
    const timeHour = parseInt(time.split(':')[0]);
    const isCurrentHour = timeHour === currentHour;
    
    return (
      <StyledCard 
        style={[
          styles.timeSlotCard,
          isCurrentHour && styles.currentTimeSlot
        ]}
      >
        <View style={styles.timeHeader}>
          <StyledText variant="h3" style={styles.timeText}>
            {time}
          </StyledText>
          <IconButton
            icon="plus-circle-outline"
            size={24}
            color={colors.primary}
            onPress={() => {
              setSelectedTimeSlot(time);
              setNewActivity(prev => ({ ...prev, time }));
              setModalVisible(true);
            }}
          />
        </View>
        {activities?.map(activity => (
          <View key={activity.id} style={styles.activityItem}>
            <Avatar.Icon
              size={40}
              icon={activity.icon}
              style={{ backgroundColor: activityTypes.find(t => t.value === activity.type)?.color }}
            />
            <View style={styles.activityContent}>
              <StyledText style={styles.activityTitle}>
                {activity.title}
              </StyledText>
              <StyledText variant="caption">
                Duration: {activity.duration} minutes
              </StyledText>
              {activity.visualSupport && (
                <View style={styles.visualSupport}>
                  <MaterialCommunityIcons
                    name={activityTypes.find(t => t.value === activity.type)?.icon}
                    size={24}
                    color={activityTypes.find(t => t.value === activity.type)?.color}
                  />
                  <StyledText variant="caption" style={styles.visualSupportText}>
                    {activityTypes.find(t => t.value === activity.type)?.label}
                  </StyledText>
                </View>
              )}
            </View>
          </View>
        ))}
      </StyledCard>
    );
  };

  return (
    <View style={styles.container}>
      {/* Date Navigation */}
      <View style={styles.dateNav}>
        <IconButton
          icon="chevron-left"
          size={28}
          color={colors.primary}
          onPress={() => {
            const newDate = new Date(currentDate);
            newDate.setDate(currentDate.getDate() - 1);
            setCurrentDate(newDate);
          }}
        />
        <StyledText variant="h2" style={styles.dateText}>
          {currentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </StyledText>
        <IconButton
          icon="chevron-right"
          size={28}
          color={colors.primary}
          onPress={() => {
            const newDate = new Date(currentDate);
            newDate.setDate(currentDate.getDate() + 1);
            setCurrentDate(newDate);
          }}
        />
      </View>

      <Divider />

      {/* Schedule Timeline */}
      <ScrollView style={styles.timeline}>
        {timeSlots.map(time => (
          <TimeSlotCard
            key={time}
            time={time}
            activities={schedules.filter(a => a.time === time)}
          />
        ))}
      </ScrollView>

      {/* Add Activity Modal */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => {
            setModalVisible(false);
            resetNewActivity();
          }}
          contentContainerStyle={styles.modalContent}
        >
          <ScrollView>
            <StyledText variant="h2" style={styles.modalTitle}>
              Add Activity
            </StyledText>

            <TextInput
              label="Activity Title"
              value={newActivity.title}
              onChangeText={text => setNewActivity(prev => ({ ...prev, title: text }))}
              mode="outlined"
              style={styles.input}
            />

            <List.Section>
              <List.Subheader>Activity Type</List.Subheader>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.activityTypeContainer}>
                  {activityTypes.map(type => (
                    <StyledButton
                      key={type.value}
                      mode={newActivity.type === type.value ? "contained" : "outlined"}
                      onPress={() => setNewActivity(prev => ({ 
                        ...prev, 
                        type: type.value,
                        icon: type.icon
                      }))}
                      style={[
                        styles.typeButton,
                        newActivity.type === type.value && { backgroundColor: type.color }
                      ]}
                      icon={type.icon}
                    >
                      {type.label}
                    </StyledButton>
                  ))}
                </View>
              </ScrollView>
            </List.Section>

            <TextInput
              label="Duration (minutes)"
              value={newActivity.duration}
              onChangeText={text => setNewActivity(prev => ({ ...prev, duration: text }))}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Notes (Optional)"
              value={newActivity.notes}
              onChangeText={text => setNewActivity(prev => ({ ...prev, notes: text }))}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
            />

            <View style={styles.switchContainer}>
              <View style={styles.switchItem}>
                <StyledText>Visual Support</StyledText>
                <Switch
                  value={newActivity.visualSupport}
                  onValueChange={value => 
                    setNewActivity(prev => ({ ...prev, visualSupport: value }))
                  }
                />
              </View>
              <View style={styles.switchItem}>
                <StyledText>Reminder</StyledText>
                <Switch
                  value={newActivity.reminder}
                  onValueChange={value => 
                    setNewActivity(prev => ({ ...prev, reminder: value }))
                  }
                />
              </View>
            </View>

            <View style={styles.modalButtons}>
              <StyledButton
                mode="outlined"
                onPress={() => {
                  setModalVisible(false);
                  resetNewActivity();
                }}
                style={styles.modalButton}
              >
                Cancel
              </StyledButton>
              <StyledButton
                mode="contained"
                onPress={addActivity}
                style={styles.modalButton}
              >
                Add Activity
              </StyledButton>
            </View>
          </ScrollView>
        </Modal>
      </Portal>

      {/* FAB for quick add */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setModalVisible(true)}
        color={colors.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  dateNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.sm,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  dateText: {
    flex: 1,
    textAlign: 'center',
    color: colors.text,
  },
  timeline: {
    flex: 1,
    padding: spacing.sm,
  },
  timeSlotCard: {
    marginBottom: spacing.sm,
  },
  currentTimeSlot: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  timeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  timeText: {
    color: colors.text,
  },
  activityItem: {
    flexDirection: 'row',
    padding: spacing.sm,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.accent3,
  },
  activityContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  activityTitle: {
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  visualSupport: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  visualSupportText: {
    marginLeft: spacing.xs,
    color: colors.subtext,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.primary,
  },
  modalContent: {
    backgroundColor: colors.surface,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: shapes.borderRadius.lg,
    maxHeight: '80%',
  },
  modalTitle: {
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
  },
  activityTypeContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.md,
  },
  typeButton: {
    marginRight: spacing.sm,
  },
  switchContainer: {
    marginVertical: spacing.md,
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
});

export default ScheduleScreen;