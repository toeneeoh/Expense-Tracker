import { useNavigation } from 'expo-router';
import { ThemedView, ThemedText } from '@/components/ThemedComponents';
import InputField from '@/components/InputField';
import { ScrollView, StyleSheet } from 'react-native';
import DropdownField from '@/components/DropdownField';

const jobTitles = ['Software Engineer', 'Finance Analyst', 'Lawyer', 'Blue-Collar Worker', 'Customer Service Worker', 'Unemployed'];// list other ones as well Nate

export default function ExpensesScreen() {
  const navigation = useNavigation() as any;

  const handleSubmit = () => {
    navigation.navigate('ProfileScreen');
  };

    return (
        <ScrollView style={styles.scollStyle}>
            <ThemedView style={styles.container}>
                <ThemedText type="title">Give us some information to work with!</ThemedText>
                <ThemedText>
                    We'll check back again in one month to see what's changed :)
                </ThemedText>

                <DropdownField darkColor="#FFFF" label="Which of these options best describes your current job?" options={jobTitles} />

                <InputField label="Hourly Salary" />
                <InputField label="How many hours per week do you usually work?" />
                <InputField label="Last Month's Total Salary" />
                <InputField label="Last Month's Total Non-Salary Income" />
                <InputField label="Last Month's total rent expenses" />
                {/*<InputField label="Last Month's total car expenses" />*/}
                <InputField label="Last Month's total grocery expenses" />
                <InputField label="Last Month's total takeout expenses" />
                <InputField label="Last Month's total dining out expenses" />
                <InputField label="Last Month's total subscription expenses" />
                <InputField label="Any other essential (i.e. needed for survival) expenses from last month not already reported" />
                <InputField label="Any other non-essential expenses from last month not already reported" />


                <ThemedText onPress={handleSubmit} style={styles.linkText}>
                    Next
                </ThemedText>
            </ThemedView>
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
    margin: 16,
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 16,
  },
});