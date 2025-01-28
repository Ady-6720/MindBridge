import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Surface, 
  Button, 
  IconButton,
  Text,
  useTheme,
  ProgressBar
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  
  const features = [
    {
      title: 'Cognitive Exercises',
      description: 'Enhance your skills with tailored exercises',
      icon: 'brain',
      color: '#FF6B6B',
      progress: 0.7,
      route: 'Cognitive'
    },
    {
      title: 'Communication Tools',
      description: 'Express yourself with picture boards and visual aids',
      icon: 'message-draw',
      color: '#4ECDC4',
      progress: 0.5,
      route: 'Communication'
    },
    {
      title: 'Emotion Recognition',
      description: 'Learn to identify and understand emotions',
      icon: 'emoticon-outline',
      color: '#FFD93D',
      progress: 0.6,
      route: 'Communication'
    },
    {
      title: 'Sensory Management',
      description: 'Tools for sensory regulation and comfort',
      icon: 'wave',
      color: '#6C5CE7',
      progress: 0.4,
      route: 'Sensory'
    },
    {
      title: 'Daily Routines',
      description: 'Manage your schedules and tasks',
      icon: 'calendar-clock',
      color: '#A8E6CF',
      progress: 0.8,
      route: 'Schedule'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <Surface style={styles.welcomeSection}>
        <View style={styles.welcomeHeader}>
          <Title style={styles.welcomeTitle}>Welcome to MindBridge</Title>
          <IconButton
            icon="cog"
            size={24}
            onPress={() => {/* Settings navigation */}}
          />
        </View>
        <Paragraph style={styles.welcomeText}>
          Your cognitive companion for personal growth
        </Paragraph>
      </Surface>

      {/* Daily Progress */}
      <Card style={styles.progressCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Today's Progress</Title>
          <View style={styles.progressContainer}>
            <View style={styles.progressItem}>
              <MaterialCommunityIcons 
                name="star-circle" 
                size={32} 
                color={theme.colors.primary} 
              />
              <Text style={styles.progressNumber}>5</Text>
              <Text style={styles.progressLabel}>Exercises</Text>
            </View>
            <View style={styles.progressItem}>
              <MaterialCommunityIcons 
                name="timer" 
                size={32} 
                color={theme.colors.primary} 
              />
              <Text style={styles.progressNumber}>45</Text>
              <Text style={styles.progressLabel}>Minutes</Text>
            </View>
            <View style={styles.progressItem}>
              <MaterialCommunityIcons 
                name="trending-up" 
                size={32} 
                color={theme.colors.primary} 
              />
              <Text style={styles.progressNumber}>80%</Text>
              <Text style={styles.progressLabel}>Success</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Feature Grid */}
      <View style={styles.featureGrid}>
        {features.map((feature, index) => (
          <Card 
            key={index} 
            style={styles.featureCard}
            onPress={() => navigation.navigate(feature.route)}
          >
            <Card.Content>
              <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
                <MaterialCommunityIcons 
                  name={feature.icon} 
                  size={32} 
                  color="white" 
                />
              </View>
              <Title style={styles.featureTitle}>{feature.title}</Title>
              <Paragraph style={styles.featureDescription}>
                {feature.description}
              </Paragraph>
              <ProgressBar 
                progress={feature.progress} 
                color={feature.color}
                style={styles.progressBar}
              />
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Quick Actions */}
      <Card style={styles.quickActionsCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Quick Actions</Title>
          <View style={styles.quickActionsGrid}>
            <Button 
              mode="contained" 
              icon="play-circle" 
              onPress={() => navigation.navigate('Cognitive')}
              style={styles.actionButton}
            >
              Start Exercise
            </Button>
            <Button 
              mode="contained" 
              icon="calendar" 
              onPress={() => navigation.navigate('Schedule')}
              style={styles.actionButton}
            >
              View Schedule
            </Button>
            <Button 
              mode="contained" 
              icon="meditation" 
              onPress={() => navigation.navigate('Sensory')}
              style={styles.actionButton}
            >
              Relax Now
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#fff',
    elevation: 4,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  progressCard: {
    margin: 16,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  progressItem: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  progressLabel: {
    color: '#666',
    marginTop: 2,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  featureCard: {
    width: Dimensions.get('window').width / 2 - 24,
    marginBottom: 16,
    marginHorizontal: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  quickActionsCard: {
    margin: 16,
    marginTop: 0,
    elevation: 4,
  },
  quickActionsGrid: {
    gap: 10,
  },
  actionButton: {
    marginVertical: 5,
  },
});

export default HomeScreen;