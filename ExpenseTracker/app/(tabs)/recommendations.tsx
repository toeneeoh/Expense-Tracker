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


import React, { useState } from 'react';
import { StyleSheet, Platform, View, Image, Pressable, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ExternalLink } from '@/components/ExternalLink';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';

// Dummy recommendation data
const recommendationData = JSON.parse('{"rec3title":"End subscriptions you no longer use","rec2title":"Pay off credit card debts before student loans","rec2desc":"Consider shifting extra payments to credit cards for maximum interest savings!","rec1title":"Cut down on takeout spending", "rec1desc":"Save money by meal prepping at home instead of frequent takeout orders."}');

export default function RecommendationsScreen() {
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#FFFFFF', dark: '#FFFFFF' }}>
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
    <Pressable onPress={toggleExpansion} style={styles.cardContainer}>
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#FFFFFF',
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
    color: '#000', // Set the text color to black
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
    ...Platform.select({
    ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
    default: {
        "--opacity": "0.4",
        boxShadow: "0 4px 10px rgba(0, 0, 0, var(--opacity))"
    },
    })
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
