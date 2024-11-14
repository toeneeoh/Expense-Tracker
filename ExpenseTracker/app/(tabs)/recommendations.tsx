import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import ApiService from '../../utils/apiService';


//userData is used/referenced to get Recommendations
const userData = JSON.parse('{"monthlyTotalIncomes":[["Oct2024", 1350.42], ["Sep2024", 1324.19]],"monthlyTotalExpenses":[["Oct2024", 1500.19], ["Sep2024", 1324.19], ["Aug2024", 1631.19]],"savings": 76.45,"incomes" : [["a", 10000], ["b", 15000], ["c", 30000]],"expenses" : [["a", 44444], ["b", 77777], ["c", 99999]],"debts" : [["Credit Card A", 150.23, 9.20], ["Credit Card B", 45.82, 6.50], ["Student Loans", 15412.36, 3.50]],"expenseOther" : 100,"expenseGroceries" : 100,"expenseDining" : 100,"expenseRent" : 100,"expenseSubscriptions" : 100,"expenseEntertainment" : 100,"expenseUtilities" : 100,"expenseCar" : 100,"incomeJob" : 100,"incomeOther" : 100}');

//const recommendationData = ApiService.updateRecommendations(userData)
//recommendation Data properly gained from backend is top line

//placeholder recommendation Data
const recommendationData = JSON.parse('{"rec3title":"End subscriptions you no longer use","rec2title":"Pay off credit card debts before student loans","rec2desc":"You have declared that you are paying $175 a month to pay down your student loans, $45 more than the minimum interest payment. While paying off debts is always good, your student loans are at a 3% interest rate while your credit card debt is at an 11% interest rate. Spending the additional $45 on credit card debt rather than student loan debt would save you an expanding $3.15 each month in interest growth, saving you $3.15 now, then $6.30 the next month, $9.45 the month after that, and so on, growing into massive savings over time!","rec1title":"Decrease take out spending", "rec1desc":"We have detected a regular habit of ordering takeout for meals, totaling $290.12 last month - 62 % more than others in your income class. While takeout meals can be a delicious treat every once in a while, cooking your own meals could save you $240.12 that could go to paying off your debt. While sandwiches are a very cheap and easy option, another option to consider is meal prepping a weeks food in advance to heat and eat as time permits."}')


 //We've detected a regular habit of ordering takeout for meals, totaling $290.12 last month - 62% more than others in your income class. While takeout meals can be a delicious treat every once in a while, cooking your own meals could save you $240.12 that could go to paying off your debt.
 //       </ThemedText >
 //   <ThemedText>
 //       While sandwiches are a very cheap and easy option, another option to consider is meal prepping a week's food in advance to heat and eat as time permits.

//external link reference to try to incorporate if possible
//    <ExternalLink href="https://www.budgetbytes.com/category/extra-bytes/budget-friendly-meal-prep/">
//        <ThemedText type="link">Learn more about meal prepping...</ThemedText>
//    </ExternalLink>

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Here's our top recommendations for you!</ThemedText>
      </ThemedView>
          <Collapsible title={recommendationData["rec1title"]}>
        <ThemedText>
                  {recommendationData["rec1desc"]}
        </ThemedText >
          </Collapsible>
          <Collapsible title={recommendationData["rec2title"]}>
        <ThemedText>
                  {recommendationData["rec2desc"]}
        </ThemedText>
      </Collapsible>
          <Collapsible title={recommendationData["rec3title"]}>
        <ThemedText>
                  {//replace below line with {recommendationData["rec3desc"]}
                  }
        You've declared that you're spending $40 a month on subscriptions to Netflix, Amazon Prime, and Hulu. Have you used all these services within the last month? Remember to regularly prune old subscriptions, and consider rotating the use of streaming services so that you're only paying for one at a time.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
