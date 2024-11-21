import React, { useState } from 'react';
import { useNavigation } from 'expo-router';
import { ThemedView, ThemedText } from '@/components/ThemedComponents';
import InputField from '@/components/InputField';
import { TextInput, ScrollView, StyleSheet } from 'react-native';
import DropdownField from '@/components/DropdownField';
import ApiService from '../../utils/apiService';
import { useUserName } from '../../utils/getUserData';
import { useUser } from '../../context/UserContext';

const jobTitles = ['Software Engineer', 'Finance Analyst', 'Lawyer', 'Blue-Collar Worker', 'Customer Service Worker', 'Unemployed'];// list other ones as well Nate

export default function ExpensesScreen() {
    const navigation = useNavigation() as any;
    const [jobTitle, setJobTitle] = useState('');
    const [jobIncome, setJobIncome] = useState('');
    const [hourlyWage, setHourlyWage] = useState('');
    const [weeklyHours, setWeeklyHours] = useState('');
    const [otherIncome, setOtherIncome] = useState('');
    const [rentExpense, setRentExpense] = useState('');
    const [groceryExpense, setGroceryExpense] = useState('');
    const [takeoutExpense, setTakeoutExpense] = useState('');
    const [diningExpense, setDiningExpense] = useState('');
    const [subscriptionExpense, setSubscriptionExpense] = useState('');
    const [otherExpense, setOtherExpense] = useState('');
    const [entertainmentExpense, setEntertainmentExpense] = useState('');

    const userName = useUserName();

    const handleSubmit = async () => {
        try {
            var result = await ApiService.pushToDatabase("job_title", jobTitle, userName, "users");
            result = await ApiService.pushToDatabase("income_job", jobIncome, userName, "users");
            result = await ApiService.pushToDatabase("hourly_wage", hourlyWage, userName, "users");
            result = await ApiService.pushToDatabase("weekly_hours", weeklyHours, userName, "users");
            result = await ApiService.pushToDatabase("income_other", otherIncome, userName, "users");
            result = await ApiService.pushToDatabase("expense_rent", rentExpense, userName, "users");
            result = await ApiService.pushToDatabase("expense_grocery", groceryExpense, userName, "users");
            result = await ApiService.pushToDatabase("expense_takeout", takeoutExpense, userName, "users");
            result = await ApiService.pushToDatabase("expense_dining", diningExpense, userName, "users");
            result = await ApiService.pushToDatabase("expense_subscriptions", subscriptionExpense, userName, "users");
            result = await ApiService.pushToDatabase("expense_other", otherExpense, userName, "users");
            result = await ApiService.pushToDatabase("expense_entertainment", rentExpense, userName, "users");
            navigation.navigate('ProfileScreen');
        } catch (error) {
            console.error('Error pushing item:', error);
        }
    };

    return (
        <ScrollView style={styles.scollStyle}>
            <ThemedView style={styles.container}>
                <ThemedText type="title">Give us some information to work with!</ThemedText>
                <ThemedText>
                    We'll check back again in one month to see what's changed :)
                </ThemedText>

                <ThemedText>
                    Which of these options best describes your current job?
                    Software Engineer, Finance Analyst, Lawyer, Blue-Collar Worker, Customer Service Worker, or Unemployed?
                </ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    value={jobTitle}
                    onChangeText={setJobTitle}
                />

                <ThemedText>
                    Hourly Salary
                </ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    value={hourlyWage}
                    onChangeText={setHourlyWage}
                />

                <ThemedText>
                    How many hours per week do you usually work?
                </ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    value={weeklyHours}
                    onChangeText={setWeeklyHours}
                />

                <ThemedText>
                    Last Month's Total Work Income
                </ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    value={jobIncome}
                    onChangeText={setJobIncome}
                />

                <ThemedText>
                    Last Month's Total Non-Work Income
                </ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    value={otherIncome}
                    onChangeText={setOtherIncome}
                />

                <ThemedText>
                    Last Month's Grocery Expenses
                </ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    value={groceryExpense}
                    onChangeText={setGroceryExpense}
                />

                <ThemedText>
                    Last Month's Takeout Expenses
                </ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    value={takeoutExpense}
                    onChangeText={setTakeoutExpense}
                />

                <ThemedText>
                    Last Month's Dining Out Expenses
                </ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    value={diningExpense}
                    onChangeText={setDiningExpense}
                />

                <ThemedText>
                    Last Month's Rent Expenses
                </ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    value={rentExpense}
                    onChangeText={setRentExpense}
                />

                <ThemedText>
                    Last Month's Subscription Expenses
                </ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    value={subscriptionExpense}
                    onChangeText={setSubscriptionExpense}
                />

                <ThemedText>
                    Any other essential (i.e. needed for survival) expenses from last month not already reported?
                </ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    value={otherExpense}
                    onChangeText={setOtherExpense}
                />

                <ThemedText>
                    Any other non-essential expenses from last month not already reported?
                </ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    value={entertainmentExpense}
                    onChangeText={setEntertainmentExpense}
                />
                <ThemedText onPress={handleSubmit} style={styles.linkText}>
                    Next
                </ThemedText>
            </ThemedView>
        </ScrollView>
  );
}

const styles = StyleSheet.create({
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 8,
        marginBottom: 16,
    },
    scollStyle: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
  container: {
    margin: 16,
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 16,
  },
});