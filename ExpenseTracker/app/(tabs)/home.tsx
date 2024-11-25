import React, { useState, useEffect } from 'react';
import { Platform, ScrollView, StyleSheet, View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeInUp, BounceIn } from 'react-native-reanimated';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import ApiService from '../../utils/apiService';
import { useUserName } from '../../utils/getUserData';
import { useUser } from '../../context/UserContext';

export default function HomeScreen() {

  const [userData, setUserData] = useState(JSON.parse('{"incomes":[["Job",3000],["Freelance",1500],["Dividends",500]]}'));
  const [incomeData, setIncomeData] = useState(JSON.parse('{"incomes":[["Job",3000],["Freelance",1500],["Dividends",500]]}'));
  const [expenseData, setExpenseData] = useState(JSON.parse('{"expenses":[["Job",3000],["Freelance",1500],["Dividends",500]]}'));
  const [debtData, setDebtData] = useState(JSON.parse('{"expenses":[["Job",3000],["Freelance",1500],["Dividends",500]]}'));
  const [monthlyIncomeData, setMonthlyIncomeData] = useState(JSON.parse('{"expenses":[["Job",3000],["Freelance",1500],["Dividends",500]]}'));
  const [monthlyExpenseData, setMonthlyExpenseData] = useState(JSON.parse('{"expenses":[["Job",3000],["Freelance",1500],["Dividends",500]]}'));
  
    const [dataFetched, setDataFetch] = useState(false)

    const userName = useUserName() || "test";
    console.log(userName)

  useEffect(() => { fetchData() }, [dataFetched])
  console.log(dataFetched)

  //hardcode to always do test user for now
  const fetchData = async () => {
      console.log("start fetch here")
    console.log(userName)
      try {
          var incomingData = await ApiService.getFromDatabase("all", userName, "users");
          console.log(incomingData["all"])
          setUserData(incomingData["all"]);
          incomingData = await ApiService.getFromDatabase("all", userName, "incomes");
          console.log(incomingData["all"])
          setIncomeData(incomingData["all"]);
          incomingData = await ApiService.getFromDatabase("all", userName, "expenses");
          console.log(incomingData["all"])
          setExpenseData(incomingData["all"]);
          incomingData = await ApiService.getFromDatabase("all", userName, "debts");
          console.log(incomingData["all"])
          setDebtData(incomingData["all"]);

          incomingData = await ApiService.getFromDatabase("all", userName, "monthly_total_incomes");
          console.log(incomingData["all"])
          setMonthlyIncomeData(incomingData["all"]);
          incomingData = await ApiService.getFromDatabase("all", userName, "monthly_total_expenses");
          console.log(incomingData["all"])
          setMonthlyExpenseData(incomingData["all"]);

          //setUserData(JSON.parse('{"incomes":[["Job",3000],["Freelance",1500],["Dividends",500]]}'));
          //setIncomeData(JSON.parse('{"incomes":[["Job",3000],["Freelance",1500],["Dividends",500]]}'));
          //setExpenseData(JSON.parse('{"expenses":[["Job",3000],["Freelance",1500],["Dividends",500]]}'));
          setDataFetch(true)
          //console.log(dataFetched)
      } catch (error) {
          console.error('Error fetching item:', error)
      }
  };
  //setUserData(JSON.parse('{"monthlyTotalIncomes":[["Oct2024", 1350.42], ["Sep2024", 1324.19]],"monthlyTotalExpenses":[["Oct2024", 1500.19], ["Sep2024", 1324.19], ["Aug2024", 1631.19]],"savings": 76.45,"incomes":[["Job",3000],["Freelance",1500],["Dividends",500]],"expenses":[["Rent",1200],["Groceries",400],["Subscriptions",200],["Dining",150]],"debts":[["Credit Card A",150.23,9.20],["Credit Card B",45.82,6.50],["Student Loans",15412.36,3.50]]}'));

    //console.log("User Data")
    //console.log(userData)
    //console.log(userData[0])
    //console.log(userData[0]["user_email"])

  //  console.log(incomeData)
  //  console.log(incomeData["incomes"])
  //  console.log(incomeData["incomes"][0])
  //  console.log(incomeData["incomes"][0][1])
  // console.log(incomeData[0])
  // console.log(incomeData[0][1])
  //console.log(incomeData["incomes"][0][1])
  //console.log(incomeData[0][1])
  // console.log("length");
  // console.log(incomeData["incomes"].length);

  //return loading screen before ANY processing if data not ready!!
  //console.log(userData[0]["job_title"])
  if (!dataFetched) return (
    <Text style={styles.headerText}>Loading...</Text>
)


//convert raw IncomeData and ExpenseData into JSON objects
var parsedIncomeData = "[";
for (let i = 0; i < incomeData.length; i++) {
  //console.log("loop");
  //console.log(incomeData["incomes"][i][1]);
  //data={[["Job",3000],["Freelance",1500],["Dividends",500]]}
  parsedIncomeData += "[\"" + incomeData[i]["income_name"] + "\"," + incomeData[i]["income_amount"] + "]"
  if (i < incomeData.length-1){
    parsedIncomeData += ","
  }
}
  parsedIncomeData+= "]"
  parsedIncomeData = JSON.parse(parsedIncomeData)

  var parsedExpenseData = "[";
  for (let i = 0; i < expenseData.length; i++) {
    //console.log("loop");
    //console.log(incomeData["incomes"][i][1]);
    //data={[["Job",3000],["Freelance",1500],["Dividends",500]]}
    parsedExpenseData += "[\"" + expenseData[i]["expense_name"] + "\"," + expenseData[i]["expense_amount"] + "]"
    if (i < expenseData.length-1){
      parsedExpenseData += ","
    }
  }
    parsedExpenseData+= "]"
    parsedExpenseData = JSON.parse(parsedExpenseData)


  var totalIncome = 0
  for (let i = 0; i < incomeData.length; i++) {
    totalIncome += parseFloat(incomeData[i]["income_amount"])
  }
  var totalDebt = 0
  for (let i = 0; i < debtData.length; i++) {
    totalDebt += parseFloat(debtData[i]["debt_amount"])
  }

  //console.log(totalIncome)
  //totalIncome = incomeData["income_amount"].reduce((acc, income) => acc + income[1], 0);

  //const totalExpenses = userData.expenses.reduce((acc, expense) => acc + expense[1], 0);
  //const totalDebt = userData["debts"].reduce((acc, debt) => acc + debt[1], 0).toFixed(2);
  const totalExpenses = 0;

  console.log(userData[0]["savings"])


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#1B1B1B' }}
      headerImage={
        <LinearGradient
          colors={['#6a11cb', '#2575fc']}
          style={styles.headerImageContainer}>
          <Ionicons name="wallet-outline" size={100} color="#ffffff" />
          <Text style={styles.headerTitle}>Your Financial Dashboard</Text>
        </LinearGradient>
      }>
      <ScrollView style={styles.container}>
        {/* Welcome Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome to Your Dashboard</Text>
          <Text style={styles.subHeaderText}>Track and manage your finances effortlessly!</Text>
        </View>

        {/* Overview Cards */}
        <View style={styles.cardsContainer}>
          <NeonCard
            title="Total Debt"
            amount={`$${totalDebt}`}
            icon="card-outline"
            colors={['#FF5252', '#FF8A80']}
          />
          <NeonCard
            title="Total Savings"
            amount={`$${parseFloat(userData[0]["savings"]).toFixed(2)}`}
            icon="cash-outline"
            colors={['#4CAF50', '#81C784']}
          />
          <NeonCard
            title="Last Month's Expenses"
            amount={`$${parseFloat(monthlyExpenseData[0]["expense_amount"]).toFixed(2)}`}
            icon="cart-outline"
            colors={['#FFA726', '#FFD54F']}
          />
          <NeonCard
            title="Last Month's Income"
            amount={`$${parseFloat(monthlyIncomeData[0]["income_amount"]).toFixed(2)}`}
            icon="trending-up-outline"
            colors={['#42A5F5', '#64B5F6']}
          />
        </View>

        <View style={styles.separator} />

        {/* Income Section */}
        <Text style={styles.sectionTitle}>This Month's Incomes</Text>
        <AlignedSection
          data={parsedIncomeData}
          type="income"
          total={totalIncome}
          gradientColors={['#42A5F5', '#64B5F6']}
        />

        {/* Expenses Section */}
        <Text style={styles.sectionTitle}>This Month's Expenses</Text>
        <AlignedSection
          data={parsedExpenseData}
          type="expense"
          total={totalExpenses}
          gradientColors={['#FF7043', '#FFAB91']}
        />
      </ScrollView>
    </ParallaxScrollView>
  );
}

// Neon Card Component
const NeonCard = ({ title, amount, icon, colors }) => {
  return (
    <Animated.View
      entering={BounceIn}
      style={styles.neonCard}>
      <LinearGradient colors={colors} style={styles.neonGradient}>
        <Ionicons name={icon} size={36} color="#ffffff" />
        <Text style={styles.neonCardText}>{title}</Text>
        <Text style={styles.neonCardAmount}>{amount}</Text>
      </LinearGradient>
    </Animated.View>
  );
};

// Aligned Section Component
const AlignedSection = ({
  data,
  type,
  total,
  gradientColors,
}: {
  data: any;
  type: string;
  total: any;
  gradientColors: any;
}) => {
  return (
    <View style={styles.alignedSectionContainer}>
      {data.map(([label, value]: [string, number]) => (
        <Animated.View
          key={label}
          entering={FadeInUp}
          style={styles.alignedCard}>
          <LinearGradient colors={gradientColors} style={styles.iconContainer}>
            <Ionicons
              name={
                type === 'income'
                  ? 'cash-outline'
                  : label === 'Rent'
                  ? 'home-outline'
                  : label === 'Groceries'
                  ? 'cart-outline'
                  : label === 'Subscriptions'
                  ? 'play-outline'
                  : label === 'Dining'
                  ? 'restaurant-outline'
                  : 'cash-outline'
              }
              size={32}
              color="#ffffff"
            />
          </LinearGradient>
          <View style={styles.alignedCardContent}>
            <Text style={styles.alignedCardTitle}>{label}</Text>
            <Text style={styles.alignedCardAmount}>${value.toFixed(2)}</Text>
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  headerImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 26,
    color: '#ffffff',
    marginTop: 12,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
  },
  subHeaderText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    marginTop: 8,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 16,
  },
  neonCard: {
    width: '48%',
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
      },
      default: {
        "--opacity": "0.2",
        boxShadow: "0 4px 8px rgba(0, 0, 0, var(--opacity))"
      },
    })
  },
  neonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  neonCardText: {
    fontSize: 18,
    marginTop: 8,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  neonCardAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#ffffff',
  },
  separator: {
    marginVertical: 24,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  alignedSectionContainer: {
    marginBottom: 24,
  },
  alignedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
      },
      default: {
        "--opacity": "0.2",
        boxShadow: "0 4px 8px rgba(0, 0, 0, var(--opacity))"
      },
    }),
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  alignedCardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  alignedCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  alignedCardAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555555',
  },
});
