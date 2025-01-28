import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  FAB, 
  Portal, 
  Modal, 
  TextInput, 
  Checkbox,
  Chip,
  Divider,
  List,
  IconButton
} from 'react-native-paper';
import { StyledCard } from '../components/StyledCard';
import { StyledText } from '../components/StyledText';
import { StyledButton } from '../components/StyledButton';
import { colors, spacing, shapes, shadows } from '../config/theme';

const TaskScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'incomplete', 'completed'
  const [errorMessage, setErrorMessage] = useState('');

  // Add new task
  const addTask = () => {
    if (newTask.trim().length === 0) {
      setErrorMessage('Please enter a task description');
      return;
    }
    
    const task = {
      id: Date.now().toString(),
      title: newTask.trim(),
      completed: false,
      createdAt: new Date(),
    };
    
    setTasks([task, ...tasks]);
    setNewTask('');
    setModalVisible(false);
    setErrorMessage('');
  };

  // Toggle task completion
  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  // Count tasks
  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    incomplete: tasks.filter(task => !task.completed).length
  };

  const TaskItem = ({ task }) => (
    <StyledCard style={styles.taskCard}>
      <View style={styles.taskContent}>
        <Checkbox.Android
          status={task.completed ? 'checked' : 'unchecked'}
          onPress={() => toggleTask(task.id)}
          color={colors.primary}
        />
        <View style={styles.taskTextContainer}>
          <StyledText 
            style={[
              styles.taskText,
              task.completed && styles.completedTask
            ]}
          >
            {task.title}
          </StyledText>
          <StyledText variant="caption" style={styles.taskDate}>
            {new Date(task.createdAt).toLocaleDateString()}
          </StyledText>
        </View>
        <IconButton
          icon="delete"
          size={20}
          color={colors.error}
          onPress={() => deleteTask(task.id)}
        />
      </View>
    </StyledCard>
  );

  return (
    <View style={styles.container}>
      {/* Task Filters */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Chip
            selected={filter === 'all'}
            onPress={() => setFilter('all')}
            style={styles.filterChip}
            selectedColor={colors.primary}
          >
            All ({taskCounts.all})
          </Chip>
          <Chip
            selected={filter === 'incomplete'}
            onPress={() => setFilter('incomplete')}
            style={styles.filterChip}
            selectedColor={colors.warning}
          >
            Incomplete ({taskCounts.incomplete})
          </Chip>
          <Chip
            selected={filter === 'completed'}
            onPress={() => setFilter('completed')}
            style={styles.filterChip}
            selectedColor={colors.success}
          >
            Completed ({taskCounts.completed})
          </Chip>
        </ScrollView>
      </View>

      <Divider />

      {/* Task List */}
      <ScrollView style={styles.taskList}>
        {filteredTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <StyledText variant="h2" style={styles.emptyStateText}>
              No {filter} tasks
            </StyledText>
            <StyledText variant="caption" style={styles.emptyStateSubtext}>
              Tap the + button to add a new task
            </StyledText>
          </View>
        ) : (
          filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </ScrollView>

      {/* Add Task FAB */}
      <FAB
        style={styles.fab}
        icon="plus"
        color={colors.buttonText}
        onPress={() => setModalVisible(true)}
      />

      {/* Add Task Modal */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => {
            setModalVisible(false);
            setNewTask('');
            setErrorMessage('');
          }}
          contentContainerStyle={styles.modalContent}
        >
          <StyledText variant="h2" style={styles.modalTitle}>
            Add New Task
          </StyledText>
          
          <TextInput
            value={newTask}
            onChangeText={setNewTask}
            placeholder="Enter task description"
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
            error={!!errorMessage}
          />
          
          {errorMessage ? (
            <StyledText style={styles.errorText}>
              {errorMessage}
            </StyledText>
          ) : null}

          <View style={styles.modalButtons}>
            <StyledButton
              mode="outlined"
              onPress={() => {
                setModalVisible(false);
                setNewTask('');
                setErrorMessage('');
              }}
              style={styles.modalButton}
            >
              Cancel
            </StyledButton>
            <StyledButton
              mode="contained"
              onPress={addTask}
              style={styles.modalButton}
            >
              Add Task
            </StyledButton>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterContainer: {
    padding: spacing.sm,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  filterChip: {
    marginRight: spacing.sm,
    backgroundColor: colors.cardBg,
  },
  taskList: {
    flex: 1,
    padding: spacing.sm,
  },
  taskCard: {
    marginBottom: spacing.sm,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
  taskTextContainer: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  taskText: {
    fontSize: 16,
  },
  taskDate: {
    color: colors.subtext,
    marginTop: spacing.xs,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: colors.subtext,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.primary,
  },
  modalContent: {
    backgroundColor: colors.surface,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: shapes.borderRadius.lg,
  },
  modalTitle: {
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
  },
  errorText: {
    color: colors.error,
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyStateText: {
    color: colors.subtext,
    marginBottom: spacing.sm,
  },
  emptyStateSubtext: {
    color: colors.subtext,
    textAlign: 'center',
  },
});

export default TaskScreen;