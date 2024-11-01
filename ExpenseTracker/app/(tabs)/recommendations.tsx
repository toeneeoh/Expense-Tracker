import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Here's our top recommendations for you!</ThemedText>
      </ThemedView>
      <Collapsible title="Decrease take out spending">
        <ThemedText>
          We've detected a regular habit of ordering takeout for meals, totaling $290.12 last month - 62% more than others in your income class. While takeout meals can be a delicious treat every once in a while, cooking your own meals could save you $240.12 that could go to paying off your debt.
        </ThemedText>
        <ThemedText>
          While sandwiches are a very cheap and easy option, another option to consider is meal prepping a week's food in advance to heat and eat as time permits.
        </ThemedText>
              <ExternalLink href="https://www.budgetbytes.com/category/extra-bytes/budget-friendly-meal-prep/">
          <ThemedText type="link">Learn more about meal prepping...</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Pay off credit card debts before student loans">
        <ThemedText>
          You've declared that you're paying $175 a month to pay down your student loans, $45 more than the minimum interest payment. While paying off debts is always good, your student loans are at a 3% interest rate while your credit card debt is at an 11% interest rate. Spending the additional $45 on credit card debt rather than student loan debt would save you an expanding $3.15 each month in interest growth, saving you $3.15 now, then $6.30 the next month, $9.45 the month after that, and so on, growing into massive savings over time!
        </ThemedText>
      </Collapsible>
      <Collapsible title="End subscriptions you no longer use">
        <ThemedText>
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
