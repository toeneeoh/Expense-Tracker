import React, { useState } from 'react';
import { ScrollView, View, TextInput, Button, Text, StyleSheet } from 'react-native';
import ApiService from '../../utils/apiService';
import { useUserName } from '../../utils/getUserData';
import { useUser } from '../../context/UserContext';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function ApiTestScreen() {
  const [itemResponse, setItemResponse] = useState(''); // Response for fetched item

  const [incomeName, setIncomeName] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const userName = useUserName();

  // Push to database
  const pushIncome = async () => {
    try {
      const result = await ApiService.pushToDatabase(incomeName, incomeAmount, userName, "incomes");
      alert(JSON.stringify(result));
    } catch (error) {
      console.error('Error pushing item:', error);
    }
  };

  const pushExpense = async () => {
    try {
      const result = await ApiService.pushToDatabase(expenseName, expenseAmount, userName, "expenses");
      alert(JSON.stringify(result));
    } catch (error) {
      console.error('Error pushing item:', error);
    }
  };

  return (
    <ScrollView style={styles.scollStyle}>
      <View style={styles.container}>
      <Text style={styles.title}>New Income for This Month</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter the type of transaction (e.g., Dining, Subscriptions, etc.)"
        value={incomeName}
        onChangeText={setIncomeName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter amount of transaction, in dollars and cents (e.g., 100.52)"
        value={incomeAmount}
        onChangeText={setIncomeAmount}
      />
      <Button title="Add Income" onPress={pushIncome} />
      {itemResponse ? <Text style={styles.result}>Fetched Item: {itemResponse}</Text> : null}

      <Text style={styles.title}>New Expense for This Month</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter the type of transaction (e.g., Dining, Subscriptions, etc.)"
        value={expenseName}
        onChangeText={setExpenseName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter amount of transaction, in dollars and cents (e.g., 100.52)"
        value={expenseAmount}
        onChangeText={setExpenseAmount}
      />
      <Button title="Add Expense" onPress={pushExpense} />
    </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
  scollStyle: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    color: 'green',
  },
});