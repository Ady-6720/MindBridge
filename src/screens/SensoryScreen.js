import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Card, Button, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing } from '../config/theme';

const SensoryScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sensoryTools = [
    {
      category: 'visual',
      title: 'Visual Comfort',
      items: [
        {
          id: 'lights',
          title: 'Light Sensitivity',
          description: 'Adjust brightness and reduce glare',
          icon: 'lightbulb-outline',
          tips: ['Dim lights', 'Use natural lighting', 'Avoid fluorescent lights']
        },
        {
          id: 'colors',
          title: 'Color Therapy',
          description: 'Calming color patterns',
          icon: 'palette',
          tips: ['Focus on blue tones', 'Avoid bright colors', 'Use soft gradients']
        }
      ]
    },
    {
      category: 'audio',
      title: 'Audio Comfort',
      items: [
        {
          id: 'noise',
          title: 'Noise Management',
          description: 'Control environmental sounds',
          icon: 'volume-medium',
          tips: ['Use noise-canceling headphones', 'Find quiet spaces', 'Create white noise']
        },
        {
          id: 'music',
          title: 'Calming Sounds',
          description: 'Soothing audio experiences',
          icon: 'music-note',
          tips: ['Listen to nature sounds', 'Use gentle music', 'Avoid sudden noises']
        }
      ]
    },
    {
      category: 'touch',
      title: 'Tactile Comfort',
      items: [
        {
          id: 'texture',
          title: 'Texture Management',
          description: 'Comfortable textures and materials',
          icon: 'hand-peace',
          tips: ['Use soft fabrics', 'Avoid irritating materials', 'Find comfortable clothing']
        },
        {
          id: 'pressure',
          title: 'Deep Pressure',
          description: 'Calming pressure techniques',
          icon: 'hand',
          tips: ['Use weighted blankets', 'Try pressure vests', 'Practice gentle squeezing']
        }
      ]
    },
    {
      category: 'movement',
      title: 'Movement Comfort',
      items: [
        {
          id: 'balance',
          title: 'Balance Activities',
          description: 'Grounding exercises',
          icon: 'meditation',
          tips: ['Practice slow movements', 'Use rocking motions', 'Try balance exercises']
        },
        {
          id: 'fidget',
          title: 'Fidget Tools',
          description: 'Movement-based calming tools',
          icon: 'rotate-3d',
          tips: ['Use fidget spinners', 'Try stress balls', 'Practice hand exercises']
        }
      ]
    }
  ];

  const CategoryButton = ({ category, title, isSelected }) => (
    <Button
      mode={isSelected ? "contained" : "outlined"}
      onPress={() => setSelectedCategory(category)}
      style={styles.categoryButton}
      labelStyle={isSelected && styles.selectedButtonText}
      icon={({size, color}) => (
        <MaterialCommunityIcons 
          name={getCategoryIcon(category)} 
          size={size} 
          color={color}
        />
      )}
    >
      {title}
    </Button>
  );

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'visual': return 'eye-outline';
      case 'audio': return 'ear-hearing';
      case 'touch': return 'hand-peace';
      case 'movement': return 'run';
      default: return 'apps';
    }
  };

  const renderToolCard = (item) => (
    <Card key={item.id} style={styles.toolCard}>
      <Card.Content>
        <View style={styles.toolHeader}>
          <MaterialCommunityIcons 
            name={item.icon} 
            size={24} 
            color={colors.primary}
          />
          <Text style={styles.toolTitle}>{item.title}</Text>
        </View>
        <Text style={styles.toolDescription}>{item.description}</Text>
        <View style={styles.tipsContainer}>
          {item.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <MaterialCommunityIcons 
                name="check" 
                size={16} 
                color={colors.success}
              />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Sensory Management Tools</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoryScroll}
      >
        <CategoryButton 
          category="all" 
          title="All Tools" 
          isSelected={selectedCategory === 'all'}
        />
        {sensoryTools.map(category => (
          <CategoryButton
            key={category.category}
            category={category.category}
            title={category.title}
            isSelected={selectedCategory === category.category}
          />
        ))}
      </ScrollView>

      <View style={styles.toolsContainer}>
        {sensoryTools
          .filter(category => selectedCategory === 'all' || category.category === selectedCategory)
          .map(category => (
            <View key={category.category}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              {category.items.map(item => renderToolCard(item))}
            </View>
          ))
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  categoryScroll: {
    marginBottom: spacing.lg,
  },
  categoryButton: {
    marginRight: spacing.sm,
    borderRadius: 20,
  },
  selectedButtonText: {
    color: colors.surface,
  },
  toolsContainer: {
    gap: spacing.lg,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  toolCard: {
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    elevation: 2,
  },
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  toolTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: spacing.sm,
  },
  toolDescription: {
    fontSize: 14,
    color: colors.subtext,
    marginBottom: spacing.md,
  },
  tipsContainer: {
    backgroundColor: colors.accent1 + '20',
    padding: spacing.md,
    borderRadius: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  tipText: {
    marginLeft: spacing.sm,
    color: colors.text,
    fontSize: 14,
  },
});

export default SensoryScreen;