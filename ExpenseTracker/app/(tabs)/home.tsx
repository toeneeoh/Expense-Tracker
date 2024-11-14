import { SectionList, Image, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import WelcomeScreen from './WelcomeScreen';

//javascript constant storing userData JSON object
//userData can be updated with ApiService getUserData function
const userData = JSON.parse('{"monthlyTotalIncomes":[["Oct2024", 1350.42], ["Sep2024", 1324.19]],"monthlyTotalExpenses":[["Oct2024", 1500.19], ["Sep2024", 1324.19], ["Aug2024", 1631.19]],"savings": 76.45,"incomes" : [["a", 10000], ["b", 15000], ["c", 30000]],"expenses" : [["a", 44444], ["b", 77777], ["c", 99999]],"debts" : [["Credit Card A", 150.23, 9.20], ["Credit Card B", 45.82, 6.50], ["Student Loans", 15412.36, 3.50]],"expenseOther" : 100,"expenseGroceries" : 100,"expenseDining" : 100,"expenseRent" : 100,"expenseSubscriptions" : 100,"expenseEntertainment" : 100,"expenseUtilities" : 100,"expenseCar" : 100,"incomeJob" : 100,"incomeOther" : 100}');

//const userData = JSON.parse('{"debts" : [["Credit Card A", 150.23, 9.20], ["Credit Card B", 45.82, 6.50], ["Student Loans", 15412.36, 3.50]]}');
var totalDebt = 0;
userData["debts"].forEach(debt => {
    totalDebt += debt[1];
})



export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome! Let's take a look at your finances...</ThemedText>
              {/* <HelloWave /> */}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle" darkColor="red">Total Debt: ${totalDebt}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle" darkColor="green">Total Savings: ${userData["savings"]}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle" darkColor="red">Last Month's Expenses: ${userData["monthlyTotalExpenses"][0][1].toFixed(2)}</ThemedText>
          </ThemedView>
      <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle" darkColor="green">Last Month's Income: ${userData["monthlyTotalIncomes"][0][1].toFixed(2)}</ThemedText>
          </ThemedView>
        <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle" darkColor="red">Last Month's Gross: ${((userData["monthlyTotalIncomes"][0][1]) - (userData["monthlyTotalExpenses"][0][1])).toFixed(2)}</ThemedText>
          </ThemedView>
          <View style={{ borderWidth: 0.3, borderStyle: 'dashed', borderRadius: 1, borderColor: 'white' }}></View>

          <TransactionsList />
      </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
    },
    container: {
        padding: 50,
        flex: 1,
    },
    item: {
        padding: 10,
        fontSize: 15,
        marginTop: 5,
    }
});

const styleSheet = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

const TransactionsList = () => {
    return (
        <View style={styleSheet.container}>
            <SectionList
                sections={[
                    {
                        title: 'Incomes',
                        data: [
                            'Salary: $112.24',
                            'Salary: $168.76',
                            'Venmo: $15.00',
                        ]
                    },
                    {
                        title: 'Expenses',
                        data: [
                            'Walmart: -$12.63',
                            'Seven Eleven: -$5.12',
                            'Amazon: -$12.43'
                        ],
                    },
                ]}
                renderItem={({ item }) => <ThemedText darkColor="white" style={styleSheet.item}>{item}</ThemedText>}
                renderSectionHeader={({ section }) => (
                    <Text style={styleSheet.sectionHeader}>{section.title}</Text>
                )}
                keyExtractor={item => `basicListEntry-${item}`}
            />
        </View>
    );
};
