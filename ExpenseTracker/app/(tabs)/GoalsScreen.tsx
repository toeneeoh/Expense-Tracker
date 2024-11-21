import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
import { ThemedView, ThemedText } from '@/components/ThemedComponents';
import IconOption from '@/components/IconOption';
import { StyleSheet } from 'react-native';
import ApiService from '../../utils/apiService';
import { useUserName } from '../../utils/getUserData';
import { useUser } from '../../context/UserContext';

export default function GoalsScreen() {
    const navigation = useNavigation() as any;
    const [goal, setGoal] = useState('');

    const userName = useUserName();

  const debtSelect = () => {
      setGoal("debt")
      console.log(goal)
    };

    const savingsSelect = () => {
        setGoal("savings")
        console.log(goal)
    };

    const retirementSelect = () => {
        setGoal("retirement")
        console.log(goal)
        
    };

    // Push to database test
    const pushData = async () => {
        try {
            console.log("Trying to push new data")
            const result = await ApiService.pushToDatabase("user_goal", goal, userName, "users");
            alert(JSON.stringify(result));
            navigation.navigate('ExpensesScreen');
        } catch (error) {
            console.error('Error pushing item:', error);
        }
    };

  return (
    <ThemedView darkColor = "#FFFF" style={styles.container}>
      <ThemedText type="title" darkColor="black">Tell us about your financial goals</ThemedText>

      <IconOption label="I want to get out of debt!" onClick={debtSelect} />
      <IconOption label="I want to build a savings!" onClick={savingsSelect} />
          <IconOption label="I want to be prepared for retirement!" onClick={retirementSelect} />
          <IconOption label="Next..." onClick={pushData} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
        margin: 16,
  },
});