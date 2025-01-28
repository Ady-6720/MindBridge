import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  Portal, 
  Modal,
  Surface,
  IconButton,
  Text,
  useTheme,
  ProgressBar
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Soothing color palette specifically chosen for autism/ADHD
const colors = {
  primary: '#4A90E2',  // Soft blue - calming
  secondary: '#7FB069', // Muted green - natural, relaxing
  tertiary: '#B4A7D6',  // Soft purple - gentle
  background: '#F5F6F8', // Light grey-blue - reduces eye strain
  surface: '#FFFFFF',    // Pure white for content
  accent1: '#9BB7D4',   // Pale blue - peaceful
  accent2: '#A8D8B9',   // Soft sage - tranquil
  accent3: '#D5A6BD',   // Muted rose - warm
  text: '#2C3E50',      // Dark blue-grey - high contrast but gentle
  subtext: '#627789'    // Medium blue-grey - secondary text
};

const CognitiveScreen = ({ navigation }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const exercises = [
    {
      id: 1,
      category: 'Focus & Attention',
      exercises: [
        {
          title: 'Pattern Memory',
          description: 'Remember and reproduce patterns to build visual memory and attention',
          duration: '5-10 mins',
          difficulty: 'Adjustable',
          icon: 'shape-plus',
          color: colors.primary,
          benefits: [
            'Improves working memory',
            'Enhances visual processing',
            'Builds sustained attention'
          ]
        },
        {
          title: 'Number Sequence',
          description: 'Follow and complete number patterns at your own pace',
          duration: '5-15 mins',
          difficulty: 'Adjustable',
          icon: 'numeric',
          color: colors.secondary,
          benefits: [
            'Strengthens sequential thinking',
            'Develops pattern recognition',
            'Improves numerical processing'
          ]
        }
      ]
    },
    {
      id: 2,
      category: 'Organization & Planning',
      exercises: [
        {
          title: 'Task Breakdown',
          description: 'Learn to break complex tasks into manageable steps',
          duration: '10-15 mins',
          difficulty: 'Easy',
          icon: 'format-list-checks',
          color: colors.tertiary,
          benefits: [
            'Improves task management',
            'Reduces overwhelm',
            'Builds planning skills'
          ]
        },
        {
          title: 'Time Estimation',
          description: 'Practice estimating time for various activities',
          duration: '5-10 mins',
          difficulty: 'Medium',
          icon: 'clock-outline',
          color: colors.accent1,
          benefits: [
            'Enhances time awareness',
            'Improves scheduling skills',
            'Develops realistic planning'
          ]
        }
      ]
    },
    {
      id: 3,
      category: 'Impulse Control',
      exercises: [
        {
          title: 'Mindful Response',
          description: 'Practice pausing and choosing responses mindfully',
          duration: '5-10 mins',
          difficulty: 'Easy',
          icon: 'meditation',
          color: colors.accent2,
          benefits: [
            'Improves self-regulation',
            'Reduces impulsive reactions',
            'Builds mindfulness'
          ]
        },
        {
          title: 'Go/No-Go Game',
          description: 'Fun exercise to practice response inhibition',
          duration: '5-8 mins',
          difficulty: 'Adjustable',
          icon: 'traffic-light',
          color: colors.accent3,
          benefits: [
            'Strengthens impulse control',
            'Improves attention',
            'Enhances decision making'
          ]
        }
      ]
    },
    {
      id: 4,
      category: 'Memory & Processing',
      exercises: [
        {
          title: 'Object Recall',
          description: 'Remember and describe objects with increasing detail',
          duration: '5-10 mins',
          difficulty: 'Adjustable',
          icon: 'eye-check',
          color: colors.primary,
          benefits: [
            'Enhances visual memory',
            'Improves descriptive skills',
            'Builds attention to detail'
          ]
        },
        {
          title: 'Category Sorting',
          description: 'Sort items into categories with increasing complexity',
          duration: '5-15 mins',
          difficulty: 'Adjustable',
          icon: 'folder-multiple',
          color: colors.secondary,
          benefits: [
            'Improves organizational skills',
            'Enhances cognitive flexibility',
            'Develops categorization abilities'
          ]
        }
      ]
    }
  ];

  const showExerciseDetails = (exercise) => {
    setSelectedExercise(exercise);
    setModalVisible(true);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Welcome Section */}
      <Surface style={styles.welcomeSection}>
        <Title style={[styles.welcomeTitle, { color: colors.text }]}>
          Cognitive Exercises
        </Title>
        <Paragraph style={[styles.welcomeText, { color: colors.subtext }]}>
          Take your time and progress at your own pace. Each exercise can be adjusted to your comfort level.
        </Paragraph>
      </Surface>

      {/* Exercise Categories */}
      {exercises.map((category) => (
        <View key={category.id} style={styles.categorySection}>
          <Title style={[styles.categoryTitle, { color: colors.text }]}>
            {category.category}
          </Title>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.exerciseScroll}
          >
            {category.exercises.map((exercise, index) => (
              <Card
                key={index}
                style={[styles.exerciseCard, { backgroundColor: colors.surface }]}
                onPress={() => showExerciseDetails(exercise)}
              >
                <Card.Content>
                  <View style={[styles.iconContainer, { backgroundColor: exercise.color }]}>
                    <MaterialCommunityIcons 
                      name={exercise.icon} 
                      size={32} 
                      color={colors.surface}
                    />
                  </View>
                  <Title style={[styles.exerciseTitle, { color: colors.text }]}>
                    {exercise.title}
                  </Title>
                  <Paragraph style={[styles.exerciseDescription, { color: colors.subtext }]}>
                    {exercise.description}
                  </Paragraph>
                  <View style={styles.exerciseMetadata}>
                    <Text style={[styles.metadataText, { color: colors.subtext }]}>
                      {exercise.duration}
                    </Text>
                    <Text style={[styles.metadataText, { color: colors.subtext }]}>
                      {exercise.difficulty}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </View>
      ))}

      {/* Exercise Details Modal */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={[styles.modal, { backgroundColor: colors.surface }]}
        >
          {selectedExercise && (
            <ScrollView>
              <IconButton
                icon="close"
                size={24}
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              />
              <View style={[styles.modalIconContainer, { backgroundColor: selectedExercise.color }]}>
                <MaterialCommunityIcons 
                  name={selectedExercise.icon} 
                  size={48} 
                  color={colors.surface}
                />
              </View>
              <Title style={[styles.modalTitle, { color: colors.text }]}>
                {selectedExercise.title}
              </Title>
              <Paragraph style={[styles.modalDescription, { color: colors.subtext }]}>
                {selectedExercise.description}
              </Paragraph>
              
              <Title style={[styles.benefitsTitle, { color: colors.text }]}>Benefits</Title>
              {selectedExercise.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <MaterialCommunityIcons 
                    name="check-circle" 
                    size={24} 
                    color={selectedExercise.color}
                  />
                  <Text style={[styles.benefitText, { color: colors.text }]}>
                    {benefit}
                  </Text>
                </View>
              ))}

              <View style={styles.modalMetadata}>
                <View style={styles.metadataItem}>
                  <MaterialCommunityIcons 
                    name="clock-outline" 
                    size={24} 
                    color={colors.subtext}
                  />
                  <Text style={[styles.metadataItemText, { color: colors.subtext }]}>
                    {selectedExercise.duration}
                  </Text>
                </View>
                <View style={styles.metadataItem}>
                  <MaterialCommunityIcons 
                    name="stairs" 
                    size={24} 
                    color={colors.subtext}
                  />
                  <Text style={[styles.metadataItemText, { color: colors.subtext }]}>
                    {selectedExercise.difficulty}
                  </Text>
                </View>
              </View>

              <Button
                mode="contained"
                onPress={() => {
                  setModalVisible(false);
                  // Navigation to exercise implementation would go here
                }}
                style={[styles.startButton, { backgroundColor: selectedExercise.color }]}
              >
                Start Exercise
              </Button>
            </ScrollView>
          )}
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    marginBottom: 10,
    elevation: 2,
  },
  welcomeTitle: {
    fontSize: 24,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: 24,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  exerciseScroll: {
    paddingHorizontal: 8,
  },
  exerciseCard: {
    width: Dimensions.get('window').width * 0.75,
    marginHorizontal: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  exerciseTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  exerciseDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  exerciseMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  metadataText: {
    fontSize: 12,
  },
  modal: {
    margin: 20,
    borderRadius: 8,
    padding: 20,
    maxHeight: '90%',
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 1,
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  benefitsTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 16,
    marginLeft: 12,
  },
  modalMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataItemText: {
    fontSize: 16,
    marginLeft: 8,
  },
  startButton: {
    marginTop: 20,
    paddingVertical: 8,
  },
});

export default CognitiveScreen;