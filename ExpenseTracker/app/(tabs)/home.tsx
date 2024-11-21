// import { SectionList, Image, StyleSheet, Platform, View, Text } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import ThemedText from '@/components/ThemedText';
// import ThemedView from '@/components/ThemedView';

// //javascript constant storing userData JSON object
// //userData can be updated with ApiService getUserData function
// const userData = JSON.parse('{"monthlyTotalIncomes":[["Oct2024", 1350.42], ["Sep2024", 1324.19]],"monthlyTotalExpenses":[["Oct2024", 1500.19], ["Sep2024", 1324.19], ["Aug2024", 1631.19]],"savings": 76.45,"incomes" : [["a", 10000], ["b", 15000], ["c", 30000]],"expenses" : [["a", 44444], ["b", 77777], ["c", 99999]],"debts" : [["Credit Card A", 150.23, 9.20], ["Credit Card B", 45.82, 6.50], ["Student Loans", 15412.36, 3.50]],"expenseOther" : 100,"expenseGroceries" : 100,"expenseDining" : 100,"expenseRent" : 100,"expenseSubscriptions" : 100,"expenseEntertainment" : 100,"expenseUtilities" : 100,"expenseCar" : 100,"incomeJob" : 100,"incomeOther" : 100}');

// //const userData = JSON.parse('{"debts" : [["Credit Card A", 150.23, 9.20], ["Credit Card B", 45.82, 6.50], ["Student Loans", 15412.36, 3.50]]}');
// var totalDebt = 0;
// userData["debts"].forEach(debt => {
//     totalDebt += debt[1];
// })



// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome! Let's take a look at your finances...</ThemedText>
//               {/* <HelloWave /> */}
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//               <ThemedText type="subtitle" darkColor="red">Total Debt: ${totalDebt}</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//               <ThemedText type="subtitle" darkColor="green">Total Savings: ${userData["savings"]}</ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//               <ThemedText type="subtitle" darkColor="red">Last Month's Expenses: ${userData["monthlyTotalExpenses"][0][1].toFixed(2)}</ThemedText>
//           </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//               <ThemedText type="subtitle" darkColor="green">Last Month's Income: ${userData["monthlyTotalIncomes"][0][1].toFixed(2)}</ThemedText>
//           </ThemedView>
//         <ThemedView style={styles.stepContainer}>
//               <ThemedText type="subtitle" darkColor="red">Last Month's Gross: ${((userData["monthlyTotalIncomes"][0][1]) - (userData["monthlyTotalExpenses"][0][1])).toFixed(2)}</ThemedText>
//           </ThemedView>
//           <View style={{ borderWidth: 0.3, borderStyle: 'dashed', borderRadius: 1, borderColor: 'white' }}></View>

//           <TransactionsList />
//       </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//     },
//     container: {
//         padding: 50,
//         flex: 1,
//     },
//     item: {
//         padding: 10,
//         fontSize: 15,
//         marginTop: 5,
//     }
// });

// const styleSheet = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 22,
//     },
//     sectionHeader: {
//         paddingTop: 2,
//         paddingLeft: 10,
//         paddingRight: 10,
//         paddingBottom: 2,
//         fontSize: 14,
//         fontWeight: 'bold',
//         backgroundColor: 'rgba(247,247,247,1.0)',
//     },
//     item: {
//         padding: 10,
//         fontSize: 18,
//         height: 44,
//     },
// });

// const TransactionsList = () => {

//     //create data object for each section
//     var incomeData = new Array<string>();

//     userData["incomes"].forEach(income => {
//         var incomeString = income[0] + ": $" + income[1];
//         incomeData.push(incomeString);
//     })

//     var expenseData = new Array<string>();
//     userData["expenses"].forEach(expense => {
//         var expenseString = expense[0] + ": $" + expense[1];
//         expenseData.push(expenseString);
//     })

//     return (
//         <View style={styleSheet.container}>
//             <SectionList
//                 sections={[
//                     {
//                         title: 'Incomes',
//                         data: 
//                             incomeData
//                             //'Salary: $112.24',
//                             //'Salary: $168.76',
//                             //'Venmo: $15.00',

//                     },
//                     {
//                         title: 'Expenses',
//                         data: expenseData,
//                     },
//                 ]}
//                 renderItem={({ item }) => <ThemedText darkColor="white" style={styleSheet.item}>{item}</ThemedText>}
//                 renderSectionHeader={({ section }) => (
//                     <Text style={styleSheet.sectionHeader}>{section.title}</Text>
//                 )}
//                 keyExtractor={item => `basicListEntry-${item}`}
//             />
//         </View>
//     );
// };
// import { SectionList, Image, StyleSheet, View, Text } from 'react-native';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { LinearGradient } from 'expo-linear-gradient';
// import Animated from 'react-native-reanimated';

// const userData = JSON.parse('{"monthlyTotalIncomes":[["Oct2024", 1350.42], ["Sep2024", 1324.19]],"monthlyTotalExpenses":[["Oct2024", 1500.19], ["Sep2024", 1324.19], ["Aug2024", 1631.19]],"savings": 76.45,"incomes" : [["Job", 3000], ["Freelance", 1500], ["Dividends", 500]],"expenses" : [["Rent", 1200], ["Groceries", 400], ["Subscriptions", 200], ["Dining", 150]],"debts" : [["Credit Card A", 150.23, 9.20], ["Credit Card B", 45.82, 6.50], ["Student Loans", 15412.36, 3.50]],"expenseOther" : 100,"expenseGroceries" : 100,"expenseDining" : 100,"expenseRent" : 100,"expenseSubscriptions" : 100,"expenseEntertainment" : 100,"expenseUtilities" : 100,"expenseCar" : 100,"incomeJob" : 100,"incomeOther" : 100}');

// // Calculate total debt
// const totalDebt = userData["debts"].reduce((acc, debt) => acc + debt[1], 0).toFixed(2);

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#FFFFFF', dark: '#1B1B1B' }}
//       headerImage={
//         <LinearGradient
//           colors={['#6a11cb', '#2575fc']}
//           style={styles.headerImageContainer}>
//           <Ionicons name="wallet-outline" size={100} color="#ffffff" />
//           <Text style={styles.headerTitle}>Your Finances Simplified</Text>
//         </LinearGradient>
//       }>
//       <View style={styles.container}>
//         {/* Header Section */}
//         <View style={styles.header}>
//           <Text style={styles.headerText}>Welcome to Your Dashboard</Text>
//           <Text style={styles.subHeaderText}>
//             Stay in control of your finances with personalized insights 🚀
//           </Text>
//         </View>

//         {/* Overview Cards */}
//         <View style={styles.cardsContainer}>
//           <GradientCard
//             title="Total Debt"
//             amount={`$${totalDebt}`}
//             icon="card-outline"
//             colors={['#FF5252', '#FF8A80']}
//           />
//           <GradientCard
//             title="Savings"
//             amount={`$${userData["savings"].toFixed(2)}`}
//             icon="cash-outline"
//             colors={['#4CAF50', '#81C784']}
//           />
//           <GradientCard
//             title="Last Month's Expenses"
//             amount={`$${userData["monthlyTotalExpenses"][0][1].toFixed(2)}`}
//             icon="cart-outline"
//             colors={['#FFA726', '#FFD54F']}
//           />
//           <GradientCard
//             title="Last Month's Income"
//             amount={`$${userData["monthlyTotalIncomes"][0][1].toFixed(2)}`}
//             icon="trending-up-outline"
//             colors={['#42A5F5', '#64B5F6']}
//           />
//         </View>

//         {/* Separator */}
//         <View style={styles.separator} />

//         {/* Transactions */}
//         <Text style={styles.sectionHeader}>Transaction Overview</Text>
//         <TransactionsList />
//       </View>
//     </ParallaxScrollView>
//   );
// }

// // Animated Gradient Card Component
// const GradientCard = ({ title, amount, icon, colors }) => {
//   return (
//     <LinearGradient colors={colors} style={styles.card}>
//       <Ionicons name={icon} size={32} color="#ffffff" />
//       <Text style={styles.cardText}>{title}</Text>
//       <Text style={styles.cardAmount}>{amount}</Text>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#F5F5F5',
//   },
//   headerImageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 250,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     paddingHorizontal: 20,
//   },
//   headerTitle: {
//     fontSize: 24,
//     color: '#ffffff',
//     marginTop: 12,
//     fontWeight: '600',
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#333333',
//   },
//   subHeaderText: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#666666',
//     marginTop: 8,
//   },
//   cardsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     gap: 16,
//     marginTop: 16,
//   },
//   card: {
//     width: '48%',
//     padding: 16,
//     borderRadius: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 5 },
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   cardText: {
//     fontSize: 16,
//     marginTop: 8,
//     color: '#ffffff',
//     textAlign: 'center',
//   },
//   cardAmount: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginTop: 4,
//     color: '#ffffff',
//   },
//   separator: {
//     marginVertical: 24,
//     borderBottomColor: '#CCCCCC',
//     borderBottomWidth: 1,
//   },
//   sectionHeader: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333333',
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
// });

// const styleSheet = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginBottom: 16,
//   },
//   sectionHeader: {
//     padding: 10,
//     fontSize: 16,
//     fontWeight: 'bold',
//     backgroundColor: '#E0E0E0',
//     color: '#333333',
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   item: {
//     padding: 12,
//     fontSize: 16,
//     backgroundColor: '#F0F0F0',
//     marginBottom: 8,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//   },
// });

// const TransactionsList = () => {
//   const incomeData = userData["incomes"].map((income) => `${income[0]}: $${income[1].toFixed(2)}`);
//   const expenseData = userData["expenses"].map(
//     (expense) => `${expense[0]}: $${expense[1].toFixed(2)}`
//   );

//   return (
//     <View style={styleSheet.container}>
//       <SectionList
//         sections={[
//           { title: 'Incomes', data: incomeData },
//           { title: 'Expenses', data: expenseData },
//         ]}
//         renderItem={({ item }) => <Text style={styleSheet.item}>{item}</Text>}
//         renderSectionHeader={({ section }) => (
//           <Text style={styleSheet.sectionHeader}>{section.title}</Text>
//         )}
//         keyExtractor={(item, index) => `${item}-${index}`}
//       />
//     </View>
//   );
// };

import React from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable } from 'react-native';
import { Platform, ScrollView, StyleSheet, View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeInUp, BounceIn } from 'react-native-reanimated';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import ApiService from '../../utils/apiService';
import { useUserName } from '../../utils/getUserData';
import { useUser } from '../../context/UserContext';

// Mock User Data
//const userData = JSON.parse('{"monthlyTotalIncomes":[["Oct2024", 1350.42], ["Sep2024", 1324.19]],"monthlyTotalExpenses":[["Oct2024", 1500.19], ["Sep2024", 1324.19], ["Aug2024", 1631.19]],"savings": 76.45,"incomes":[["Job",3000],["Freelance",1500],["Dividends",500]],"expenses":[["Rent",1200],["Groceries",400],["Subscriptions",200],["Dining",150]],"debts":[["Credit Card A",150.23,9.20],["Credit Card B",45.82,6.50],["Student Loans",15412.36,3.50]]}');

export default function HomeScreen() {

  const [userData, setUserData] = useState(JSON.parse('{"incomes":[["Job",3000],["Freelance",1500],["Dividends",500]]}'));
  const [incomeData, setIncomeData] = useState(JSON.parse('{"incomes":[["Job",3000],["Freelance",1500],["Dividends",500]]}'));
  const [expenseData, setExpenseData] = useState(JSON.parse('{"expenses":[["Job",3000],["Freelance",1500],["Dividends",500]]}'));
  const [debtData, setDebtData] = useState(JSON.parse('{"expenses":[["Job",3000],["Freelance",1500],["Dividends",500]]}'));
  const [monthlyIncomeData, setMonthlyIncomeData] = useState(JSON.parse('{"expenses":[["Job",3000],["Freelance",1500],["Dividends",500]]}'));
  const [monthlyExpenseData, setMonthlyExpenseData] = useState(JSON.parse('{"expenses":[["Job",3000],["Freelance",1500],["Dividends",500]]}'));
  
  const [dataFetched, setDataFetch] = useState(false)

  useEffect(() => { fetchData() }, [dataFetched])
  console.log(dataFetched)

  //hardcode to always do test user for now
  const fetchData = async () => {
    console.log("start fetch here")
      try {
          var incomingData = await ApiService.getFromDatabase("all", "test", "users");
          console.log(incomingData["all"])
          setUserData(incomingData["all"]);
          incomingData = await ApiService.getFromDatabase("all", "test", "incomes");
          console.log(incomingData["all"])
          setIncomeData(incomingData["all"]);
          incomingData = await ApiService.getFromDatabase("all", "test", "expenses");
          console.log(incomingData["all"])
          setExpenseData(incomingData["all"]);
          incomingData = await ApiService.getFromDatabase("all", "test", "debts");
          console.log(incomingData["all"])
          setDebtData(incomingData["all"]);

          incomingData = await ApiService.getFromDatabase("all", "test", "monthly_total_incomes");
          console.log(incomingData["all"])
          setMonthlyIncomeData(incomingData["all"]);
          incomingData = await ApiService.getFromDatabase("all", "test", "monthly_total_expenses");
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
            title="Savings"
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
