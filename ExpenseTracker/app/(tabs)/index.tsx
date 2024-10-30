import { SectionList, Image, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import WelcomeScreen from './WelcomeScreen';

const transactions = [
    {
        id: "1",
        name: "Walmart",
        amount: "-12.63",
        type: "expense",
    },
    {
        id: "2",
        name: "Seven Eleven",
        amount: "-5.12",
        type: "expense",
    },
    {
        id: "3",
        name: "Amazon",
        amount: "-24.13",
        type: "expense",
    },
    {
        id: "4",
        name: "Job",
        amount: "112.12",
        type: "income",
    }
];

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
            <ThemedText type="subtitle" darkColor="red">Total Debt: $538.40</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle" darkColor="green">Total Savings: $76.15</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle" darkColor="red">Last Month's Expenses: $1490.15</ThemedText>
          </ThemedView>
      <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle" darkColor="green">Last Month's Income: $1360.12</ThemedText>
          </ThemedView>
        <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle" darkColor="red">Last Month's Gross: -$130.03</ThemedText>
          </ThemedView>
          <View style={{ borderWidth: 0.3, borderStyle: 'dashed', borderRadius: 1, borderColor: 'white' }}></View>

          <View>
              {transactions.map((transaction) => {
                  return (
                      <View>
                          <ThemedText darkColor="white" style={styles.item}>{transaction.name} ${transaction.amount}</ThemedText>
                      </View>
                  );
              })}
          </View>
          
         
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

const SectionListBasics = () => {
    return (
        <View style={styleSheet.container}>
            <SectionList
                sections={[
                    { title: 'D', data: ['Devin', 'Dan', 'Dominic'] },
                    {
                        title: 'J',
                        data: [
                            'Jackson',
                            'James',
                            'Jillian',
                            'Jimmy',
                            'Joel',
                            'John',
                            'Julie',
                        ],
                    },
                ]}
                renderItem={({ item }) => <Text style={styleSheet.item}>{item}</Text>}
                renderSectionHeader={({ section }) => (
                    <Text style={styleSheet.sectionHeader}>{section.title}</Text>
                )}
                keyExtractor={item => `basicListEntry-${item}`}
            />
        </View>
    );
};
