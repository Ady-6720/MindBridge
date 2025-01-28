import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { colors, shadows, shapes } from '../config/theme';

export const StyledCard = ({ style, children, ...props }) => {
  return (
    <Card style={[styles.card, style]} {...props}>
      {children}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: shapes.borderRadius.lg,
    ...shadows.md,
    margin: 8,
  },
});