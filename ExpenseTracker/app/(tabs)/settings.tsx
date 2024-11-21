import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity, Switch, Alert } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Pressable, Switch, Alert } from 'react-native';
import FeatherIcon from '@expo/vector-icons/Feather';
//import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useNavigation } from 'expo-router';
import ApiService from '../../utils/apiService';

//const userData = {
//    userName: "John Doe",
//    address: "123 Somewhere Street",
//    cityName: "Fairfax",
//    stateName: "VA",
//    rent: "$1200",
//    expenses: "$300",
//    debt: "$5000",
//    loans: "$15000",
//};

//const generatePdf = async () => {
//    try {
//        const htmlContent = `
//            <html>
//                <body>
//                    <h1 style="text-align: center;">Financial Report</h1>
//                    <h2>User Information</h2>
//                    <p>Name: ${userData.userName}</p>
//                    <p>Location: ${locationData}</p>
//                    <h2>Financial Details</h2>
//                    <p>Rent: ${userData.rent}</p>
//                    <p>Expenses: ${userData.expenses}</p>
//                    <p>Debt: ${userData.debt}</p>
//                    <p>Loans: ${userData.loans}</p>
//                </body>
//            </html>
//        `;

//        const pdfOptions = {
//            html: htmlContent,
//            fileName: 'Financial_Report',
//            directory: 'Documents',
//        };

//        const file = await RNHTMLtoPDF.convert(pdfOptions);

//        Alert.alert('PDF Generated', `Your PDF has been saved to: ${file.filePath}`);
//    } catch (error) {
//        console.error('PDF generation error:', error);
//        Alert.alert('Error', 'Failed to generate PDF. Please try again.');
//    }
//};

        //const file = await RNHTMLtoPDF.convert(pdfOptions);

        //Alert.alert('PDF Generated', `Your PDF has been saved to: ${file.filePath}`);
    } catch (error) {
        console.error('PDF generation error:', error);
        Alert.alert('Error', 'Failed to generate PDF. Please try again.');
    }
};

export default function SettingsScreen() {
    const [userData, setUserData] = useState(JSON.parse('{"incomes":[["Job",3000],["Freelance",1500],["Dividends",500]]}'));

    const [dataFetched, setDataFetch] = useState(false)

    useEffect(() => { fetchData() }, [dataFetched])

    const fetchData = async () => {
        console.log("start fetch here")
        try {
            var incomingData = await ApiService.getFromDatabase("all", "test", "users");
            console.log(incomingData["all"])
            setUserData(incomingData["all"]);
            setDataFetch(true)
        } catch (error) {
            console.error('Error fetching item:', error)
        }
    };
    const navigation = useNavigation() as any;

    const [form, setForm] = useState({
        darkMode: false,
        emailNotifications: true,
        pushNotifications: false,
    });

    if (!dataFetched) return (
        <Text style={styles.headerText}>Loading...</Text>
    )


    console.log(userData[0]["address"])
    const locationData = `${userData[0]["address"]} - ${userData[0]["city_name"]}, ${userData[0]["state_name"]}`;

    // const generatePdf = async () => {
    //     try {
    //         const htmlContent = `
    //             <html>
    //                 <body>
    //                     <h1 style="text-align: center;">Financial Report</h1>
    //                     <h2>User Information</h2>
    //                     <p>Name: ${userData.userName}</p>
    //                     <p>Location: ${locationData}</p>
    //                     <h2>Financial Details</h2>
    //                     <p>Rent: ${userData.rent}</p>
    //                     <p>Expenses: ${userData.expenses}</p>
    //                     <p>Debt: ${userData.debt}</p>
    //                     <p>Loans: ${userData.loans}</p>
    //                 </body>
    //             </html>
    //         `;

    //         const pdfOptions = {
    //             html: htmlContent,
    //             fileName: 'Financial_Report',
    //             directory: 'Documents',
    //         };

    //         //const file = await RNHTMLtoPDF.convert(pdfOptions);

    //         Alert.alert('PDF Generated', `Your PDF has been saved to: ${file.filePath}`);
    //     } catch (error) {
    //         console.error('PDF generation error:', error);
    //         Alert.alert('Error', 'Failed to generate PDF. Please try again.');
    //     }
    //};

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            <View style={styles.profile}>
            <Pressable
                  onPress={() => {
                      // handle onPress
                  }}>
              </Pressable>
                <View>
                    <Text style={styles.profileName}>{userData.userName}</Text>
                    <Text style={styles.profileAddress}>{locationData}</Text>
                </View>
            </View>

              <View>
                    <Text style={styles.profileName}>{userData[0]["username"]}</Text>
            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>

                    <Pressable
                        onPress={() => navigation.navigate('GoalsScreen')}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
                            <FeatherIcon color="#fff" name="globe" size={20} />
                        </View>
                        <Text style={styles.rowLabel}>Update User Data</Text>
                        <View style={styles.rowSpacer} />
                        <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                    </Pressable>
                </View>
            </ScrollView>

          <ScrollView>
              <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Preferences</Text>
                  <Pressable
                      onPress={() => {
                            navigation.navigate('ExpensesScreen');
                      }}
                      style={styles.row}>
                      <View style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
                          <FeatherIcon color="#fff" name="globe" size={20} />

                          </View>

                    <Text style={styles.rowLabel}>Update Financial Data</Text> {/* Go through onboarding process again */ }
                    <View style={styles.rowSpacer} />
                <FeatherIcon
                        color="#C6C6C6"
                        name="chevron-right"
                        size={20} />
                    </Pressable>
                    {/* New Option for "Create a PDF for Your Finances" */}
                    <Pressable onPress={() => {
                            /*generatePdf*/
                      }} style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#9b59b6' }]}>
                            <FeatherIcon color="#fff" name="file-text" size={20} />
                        </View>
                        <Text style={styles.rowLabel}>Create a PDF for your finances</Text>
                        <View style={styles.rowSpacer} />
                        <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                    </Pressable>

                  <Pressable
                      onPress={() => {
                            navigation.navigate('ProfileScreen');
                      }}
                      style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                          <FeatherIcon
                              color="#fff"
                              name="navigation"
                              size={20} />
                        </View>

                      <Text style={styles.rowLabel}>Update Location</Text>

                      <View style={styles.rowSpacer} />

                      <FeatherIcon
                          color="#C6C6C6"
                          name="chevron-right"
                          size={20} />
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            navigation.navigate('GoalsScreen');
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                            <FeatherIcon
                                color="#fff"
                                name="dollar-sign"
                                size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Change Financial Goal</Text>

                        <View style={styles.rowSpacer} />

                        <FeatherIcon
                            color="#C6C6C6"
                            name="chevron-right"
                            size={20} />
                    </Pressable>

                  {/* <View style={styles.row}>
                      <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                          <FeatherIcon color="#fff" name="bell" size={20} />
                      </View>

                      <Text style={styles.rowLabel}>Push Notifications</Text>

                      <View style={styles.rowSpacer} />

                      <Switch
                          onValueChange={pushNotifications =>
                              setForm({ ...form, pushNotifications })
                          }
                          value={form.pushNotifications} />
                  </View>*/}
              </View> 
              <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Resources</Text>

                  <Pressable
                      onPress={() => {
                          // handle onPress
                      }}
                      style={styles.row}>
                      <View style={[styles.rowIcon, { backgroundColor: '#8e8d91' }]}>
                          <FeatherIcon color="#fff" name="flag" size={20} />
                      </View>

                      <Text style={styles.rowLabel}>Report Bug</Text>

                      <View style={styles.rowSpacer} />

                      <FeatherIcon
                          color="#C6C6C6"
                          name="chevron-right"
                          size={20} />
                  </Pressable>

                  <Pressable
                      onPress={() => {
                          // handle onPress
                      }}
                      style={styles.row}>
                      <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                          <FeatherIcon color="#fff" name="mail" size={20} />
                      </View>

                      <Text style={styles.rowLabel}>Contact Us</Text>
                      <View style={styles.rowSpacer} />
                        <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
                    </Pressable>

                  <Pressable
                      onPress={() => {
                          // handle onPress
                      }}
                      style={styles.row}>
                      <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                          <FeatherIcon color="#fff" name="star" size={20} />
                      </View>

                      <Text style={styles.rowLabel}>Rate in App Store</Text>

                      <View style={styles.rowSpacer} />

                      <FeatherIcon
                          color="#C6C6C6"
                          name="chevron-right"
                          size={20} />
                  </Pressable>
              </View>
          </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333333',
    },
    profile: {
        padding: 24,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileName: {
        marginTop: 20,
        fontSize: 19,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
    },
    profileAddress: {
        marginTop: 5,
        fontSize: 16,
        color: '#989898',
        textAlign: 'center',
    },
    section: {
        paddingHorizontal: 24,
    },
    sectionTitle: {
        paddingVertical: 12,
        fontSize: 12,
        fontWeight: '600',
        color: '#9e9e9e',
        textTransform: 'uppercase',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#404040',
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 12,
    },
    rowIcon: {
        width: 32,
        height: 32,
        borderRadius: 9999,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowLabel: {
        fontSize: 17,
        fontWeight: '400',
        color: '#fff',
    },
    rowSpacer: {
        flexGrow: 1,
    },
});