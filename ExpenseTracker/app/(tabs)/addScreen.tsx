import React, { useState } from 'react';
import { ScrollView, View, TextInput, Pressable, Text, StyleSheet, Alert } from 'react-native';
import FeatherIcon from '@expo/vector-icons/Feather';
import ApiService from '../../utils/apiService';
import { useUserName } from '../../utils/getUserData';

export default function ApiTestScreen() {
  const [incomeName, setIncomeName] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const userName = useUserName();

  const insertIncome = async () => {
    try {
      const result = await ApiService.insertRow(
        {
          username: userName || 'test',
          income_name: incomeName,
          income_frequency: 'monthly',
          income_amount: incomeAmount,
        },
        'incomes'
      );
      Alert.alert('Success', 'Income added successfully!');
    } catch (error) {
      console.error('Error inserting income:', error);
    }
  };

  const insertExpense = async () => {
    try {
      const result = await ApiService.insertRow(
        {
          username: userName || 'test',
          expense_name: expenseName,
          expense_frequency: 'monthly',
          expense_amount: expenseAmount,
        },
        'expenses'
      );
      Alert.alert('Success', 'Expense added successfully!');
    } catch (error) {
      console.error('Error inserting expense:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>New Income for This Month</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter income type (e.g., Salary, Freelance)"
          value={incomeName}
          onChangeText={setIncomeName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter income amount (e.g., 1000.00)"
          keyboardType="decimal-pad"
          value={incomeAmount}
          onChangeText={setIncomeAmount}
        />
        <Pressable style={styles.button} onPress={insertIncome}>
          <FeatherIcon name="plus" size={20} color="#fff" />
          <Text style={styles.buttonText}>Add Income</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>New Expense for This Month</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter expense type (e.g., Rent, Utilities)"
          value={expenseName}
          onChangeText={setExpenseName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter expense amount (e.g., 500.00)"
          keyboardType="decimal-pad"
          value={expenseAmount}
          onChangeText={setExpenseAmount}
        />
        <Pressable style={styles.button} onPress={insertExpense}>
          <FeatherIcon name="minus" size={20} color="#fff" />
          <Text style={styles.buttonText}>Add Expense</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Match settings page background color
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#404040',
    backgroundColor: '#121212',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#32c759', // Green button for consistency
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
