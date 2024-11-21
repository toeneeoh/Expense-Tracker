// import Ionicons from '@expo/vector-icons/Ionicons';
// import { StyleSheet, Image, Platform } from 'react-native';

// import { Collapsible } from '@/components/Collapsible';
// import { ExternalLink } from '@/components/ExternalLink';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import ThemedText from '@/components/ThemedText';
// import ThemedView from '@/components/ThemedView';
// import ApiService from '../../utils/apiService';


// //userData is used/referenced to get Recommendations
// const userData = JSON.parse('{"monthlyTotalIncomes":[["Oct2024", 1350.42], ["Sep2024", 1324.19]],"monthlyTotalExpenses":[["Oct2024", 1500.19], ["Sep2024", 1324.19], ["Aug2024", 1631.19]],"savings": 76.45,"incomes" : [["a", 10000], ["b", 15000], ["c", 30000]],"expenses" : [["a", 44444], ["b", 77777], ["c", 99999]],"debts" : [["Credit Card A", 150.23, 9.20], ["Credit Card B", 45.82, 6.50], ["Student Loans", 15412.36, 3.50]],"expenseOther" : 100,"expenseGroceries" : 100,"expenseDining" : 100,"expenseRent" : 100,"expenseSubscriptions" : 100,"expenseEntertainment" : 100,"expenseUtilities" : 100,"expenseCar" : 100,"incomeJob" : 100,"incomeOther" : 100}');

// //const recommendationData = ApiService.updateRecommendations(userData)
// //recommendation Data properly gained from backend is top line

// //placeholder recommendation Data
// const recommendationData = JSON.parse('{"rec3title":"End subscriptions you no longer use","rec2title":"Pay off credit card debts before student loans","rec2desc":"You have declared that you are paying $175 a month to pay down your student loans, $45 more than the minimum interest payment. While paying off debts is always good, your student loans are at a 3% interest rate while your credit card debt is at an 11% interest rate. Spending the additional $45 on credit card debt rather than student loan debt would save you an expanding $3.15 each month in interest growth, saving you $3.15 now, then $6.30 the next month, $9.45 the month after that, and so on, growing into massive savings over time!","rec1title":"Decrease take out spending", "rec1desc":"We have detected a regular habit of ordering takeout for meals, totaling $290.12 last month - 62 % more than others in your income class. While takeout meals can be a delicious treat every once in a while, cooking your own meals could save you $240.12 that could go to paying off your debt. While sandwiches are a very cheap and easy option, another option to consider is meal prepping a weeks food in advance to heat and eat as time permits."}')


//  //We've detected a regular habit of ordering takeout for meals, totaling $290.12 last month - 62% more than others in your income class. While takeout meals can be a delicious treat every once in a while, cooking your own meals could save you $240.12 that could go to paying off your debt.
//  //       </ThemedText >
//  //   <ThemedText>
//  //       While sandwiches are a very cheap and easy option, another option to consider is meal prepping a week's food in advance to heat and eat as time permits.

// //external link reference to try to incorporate if possible
// //    <ExternalLink href="https://www.budgetbytes.com/category/extra-bytes/budget-friendly-meal-prep/">
// //        <ThemedText type="link">Learn more about meal prepping...</ThemedText>
// //    </ExternalLink>

// export default function TabTwoScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
//       headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Here's our top recommendations for you!</ThemedText>
//       </ThemedView>
//           <Collapsible title={recommendationData["rec1title"]}>
//         <ThemedText>
//                   {recommendationData["rec1desc"]}
//         </ThemedText >
//           </Collapsible>
//           <Collapsible title={recommendationData["rec2title"]}>
//         <ThemedText>
//                   {recommendationData["rec2desc"]}
//         </ThemedText>
//       </Collapsible>
//           <Collapsible title={recommendationData["rec3title"]}>
//         <ThemedText>
//                   {//replace below line with {recommendationData["rec3desc"]}
//                   }
//         You've declared that you're spending $40 a month on subscriptions to Netflix, Amazon Prime, and Hulu. Have you used all these services within the last month? Remember to regularly prune old subscriptions, and consider rotating the use of streaming services so that you're only paying for one at a time.
//         </ThemedText>
//       </Collapsible>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     color: '#808080',
//     bottom: -90,
//     left: -35,
//     position: 'absolute',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
// });


import React, { useState, useEffect } from 'react';
import { Text, Button, StyleSheet, View, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ExternalLink } from '@/components/ExternalLink';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import ApiService from '../../utils/apiService';

// Dummy recommendation data
var recommendationData = JSON.parse('{"rec3title":"End subscriptions you no longer use","rec2title":"Pay off credit card debts before student loans","rec2desc":"Consider shifting extra payments to credit cards for maximum interest savings!","rec1title":"Cut down on takeout spending", "rec1desc":"Save money by meal prepping at home instead of frequent takeout orders."}');
//var recommendationData = ApiService.updateRecommendations()
console.log(recommendationData)

export default function RecommendationsScreen() {

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
        if (i < incomeData.length - 1) {
            parsedIncomeData += ","
        }
    }
    parsedIncomeData += "]"
    parsedIncomeData = JSON.parse(parsedIncomeData)

    var parsedExpenseData = "[";
    for (let i = 0; i < expenseData.length; i++) {
        //console.log("loop");
        //console.log(incomeData["incomes"][i][1]);
        //data={[["Job",3000],["Freelance",1500],["Dividends",500]]}
        parsedExpenseData += "[\"" + expenseData[i]["expense_name"] + "\"," + expenseData[i]["expense_amount"] + "]"
        if (i < expenseData.length - 1) {
            parsedExpenseData += ","
        }
    }
    parsedExpenseData += "]"
    parsedExpenseData = JSON.parse(parsedExpenseData)

    function generateRecommendations() {
        //javascript version of python script

        //unsorted recommendationsList, as JSON
        var uRecommendationsList = {
            "moveOutCity": 100,
            "getBetterJob": 100,
            "payOffHighInterest": 0,
            "payOffSmallDebts": 0,
            "lessTakeout": 100,
            "cheaperGroceries": 100,
            "lessEntertainment": 100, //user should abide by the 50/30/20 rule, spending 30% or less of their income on entertainment
            "workMoreGigs": 2, //user should work more hours by doordashing or instacarting
            "endSubscriptions": 10,
            "getRoommates" : 10, //user should get roommates to split rent
            "debtSettlement": 2,
            "bankruptcy": 1,
            "buildSavings": -100, //user should at least have 1 month of expenses in an emergency savings before paying down any debt at all, to avoid going into greater debt
            "saveMoreMoney": -100, //user should save 20% or more of their income
            "investSavings": -100, //user has a large amount of uninvested savings, more than one month's total expenses
        }

        var expenseTotal = parseFloat(userData[0]["expenseOther"]) + parseFloat(userData[0]["expenseGroceries"]) + parseFloat(userData[0]["expenseDining"]) + parseFloat(userData[0]["expenseRent"]) + parseFloat(userData[0]["expenseSubscriptions"]) + parseFloat(userData[0]["expenseEntertainment"])
        var incomeTotal = parseFloat(userData[0]["incomeJob"]) + parseFloat(userData[0]["incomeOther"])

        console.log(expenseTotal)
        console.log(incomeTotal)

        var cityAverage = 0

        if (userData[0]["city_name"] == "Washington, D.C.") {
            if (userData[0]["bedrooms_needed"] == 1) {
                cityAverage = 1855.00
            } else if (userData[0]["bedrooms_needed"] == 2) {
                cityAverage = 3084.00
            } else if (userData[0]["bedrooms_needed"] == 3) {
                cityAverage = 3937.00
            } else if (userData[0]["bedrooms_needed"] == 4) {
                cityAverage = 5366.00
            } else {
                cityAverage = 2286.00
            }
        } else if (userData[0]["city_name"] == "Fairfax") {
            if (userData[0]["bedrooms_needed"] == 1) {
                cityAverage = 1858.00
            } else if (userData[0]["bedrooms_needed"] == 2) {
                cityAverage = 2514.00
            } else if (userData[0]["bedrooms_needed"] == 3) {
                cityAverage = 2872.00
            } else if (userData[0]["bedrooms_needed"] == 4) {
                cityAverage = 3474.00
            } else {
                cityAverage = 2081.00
            }
        } else if (userData[0]["city_name"] == "Arlington") {
            if (userData[0]["bedrooms_needed"] == 1) {
                cityAverage = 2047.00
            } else if (userData[0]["bedrooms_needed"] == 2) {
                cityAverage = 3089.00
            } else if (userData[0]["bedrooms_needed"] == 3) {
                cityAverage = 4082.00
            } else if (userData[0]["bedrooms_needed"] == 4) {
                cityAverage = 6037.00
            } else {
                cityAverage = 2341.00
            }
        } else {
            //default value if city not found for some reason, average nationwide rent price
            cityAverage = 1558.00
        }

        var jobAverage = 0 //hourly rate

        switch (userData[0]["job_title"]) {
            case "Software Engineer":
                jobAverage = 45.13;
                break;
            case "Finance Analyst":
                jobAverage = 39.48;
                break;
            case "Lawyer":
                jobAverage = 40.52;
                break;
            case "Blue-Collar Worker": //plumbers, mechanics, electricians, etc.
                jobAverage = 25.69;
                break;
            case "Customer Service Worker": //unskilled entry - level customer service: cashier, waiter, etc
                jobAverage = 14.72;
                break;
        }

        uRecommendationsList["moveInCity"] = (userData[0]["expense_rent"] - (cityAverage / userData[0]["roommatesNum"]))
        uRecommendationsList["moveOutCity"] = (userData[0]["expense_rent"] - 1558.00)
        uRecommendationsList["getBetterJob"] = ((userData[0]["hourly_rate"] - jobAverage) * userData[0]["weekly_hours"])
        uRecommendationsList["lessTakeout"] = (userData[0]["expense_takeout"])
        uRecommendationsList["cheaperGroceries"] = ((userData[0]["expense_groceries"] - (250.00 * userData[0]["dependents_num"])) * userData["dependents_num"])
        uRecommendationsList["lessEntertainment"] = ((userData[0]["expense_entertainment"] + userData[0]["expense_dining"] + userData["expense_subscriptions"]) - (incomeTotal * 0.3))
        uRecommendationsList["workMoreGigs"] = ((35 - userData[0]["weekly_hours"]) * 12)

        var totalDebtPayments = 0

        for (let i = 0; i < debtData.length; i++) {
            totalDebtPayments = totalDebtPayments + debtData[i]["debt_amount"]

            if (debtData[i]["debt_amount"] < incomeTotal * 0.1) {
                uRecommendationsList["payOffSmallDebts"] = incomeTotal * 0.1;
            }
        }

        if (userData[0]["roommates_num"] < 1 && userData[0]["expense_rent"] > cityAverage) {
            uRecommendationsList["getRoommates"] = (100.00)
        }

        if (totalDebtPayments > 0 && userData["savings"] < expenseTotal) {
            uRecommendationsList["buildSavings"] = (75.00)
        }

        if (userData["user_goal"] != "debt") {
            uRecommendationsList["saveMoreMoney"] = ((incomeTotal * 0.2) - userData[0]["savings_increase"]) * 5
            uRecommendationsList["investSavings"] = (userData[0]["savings"] - expenseTotal) / 10
        }

        //rList is the sorted recommendation list to be returned
        rList = uRecommendationsList.sort()


        return recommendationData;
    }

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#FFFFFF', dark: '#00000' }}>
      {/* Circular Image Above Title */}
      <View style={styles.headerContainer}>
        <Image
          source={require('@/assets/images/rimg.png')} 
          style={styles.headerImage}
        />
        <ThemedText type="title" style={styles.headerText}>
          Top Financial Recommendations for You
        </ThemedText>
      </View>

      {/* Recommendations Section */}
          <ThemedView style={styles.recommendationsContainer}>
              <Button title="Refresh Recommendations" onPress={generateRecommendations} />
              &nbsp;

        <RecommendationCard
          title={recommendationData["rec1title"]}
          description={recommendationData["rec1desc"]}
          gradientColors={['#FF6B6B', '#FFD93D']}
          externalLink="https://www.budgetbytes.com/category/extra-bytes/budget-friendly-meal-prep/"
          linkText="Learn more about cutting down on spending"
        />
        <RecommendationCard
          title={recommendationData["rec2title"]}
          description={recommendationData["rec2desc"]}
          gradientColors={['#4ECDC4', '#556270']}
          externalLink="https://www.nerdwallet.com/article/finance/how-to-pay-off-credit-card-debt"
          linkText="Learn how to pay off credit cards effectively"
        />
        <RecommendationCard
          title={recommendationData["rec3title"]}
          description="Rotate your streaming subscriptions to save costs."
          gradientColors={['#FFD93D', '#FF6B6B']}
          externalLink="https://www.cnbc.com/select/tips-for-managing-your-subscriptions/"
          linkText="Tips on managing subscriptions effectively"
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const RecommendationCard = ({ title, description, gradientColors, externalLink, linkText }) => {
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useState(new Animated.Value(0))[0];
  const rotateValue = useState(new Animated.Value(0))[0];

  const toggleExpansion = () => {
    setExpanded(!expanded);
    Animated.timing(animatedHeight, {
      toValue: expanded ? 0 : 100,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();

    Animated.timing(rotateValue, {
      toValue: expanded ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.elastic(1),
    }).start();
  };

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableOpacity onPress={toggleExpansion} style={styles.cardContainer}>
      <LinearGradient colors={gradientColors} style={styles.card}>
        <View style={styles.cardHeader}>
          <ThemedText type="subtitle" style={styles.cardTitle}>{title}</ThemedText>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <Image
              source={require('@/assets/images/icon.png')} // Example icon for each card
              style={styles.cardIcon}
            />
          </Animated.View>
        </View>
        <Animated.View style={[styles.cardContent, { height: animatedHeight }]}>
          <ThemedText style={styles.cardDescription}>{description}</ThemedText>
          <ExternalLink href={externalLink}>
            <ThemedText type="link" style={styles.linkText}>{linkText}</ThemedText>
          </ExternalLink>
        </Animated.View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#00000',
    paddingBottom: 20,
  },
  headerImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make the image circular
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF', // Set the text color to black
    textAlign: 'center',
  },
  recommendationsContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  cardContainer: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  card: {
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
  },
  cardContent: {
    overflow: 'hidden',
    marginTop: 15,
  },
  cardDescription: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
