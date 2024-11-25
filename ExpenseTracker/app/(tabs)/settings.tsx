import React, { useState, useEffect } from 'react';
import {
    Pressable,
    Linking,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Alert,
} from 'react-native';
import FeatherIcon from '@expo/vector-icons/Feather';
import { useNavigation } from 'expo-router';
import ApiService from '../../utils/apiService';

// Define the structure of the user data
interface User {
    username: string;
    address: string;
    city_name: string;
    state_name: string;
}

type Navigation = {
    navigate: (screen: string) => void;
}

export default function SettingsScreen() {
    const [userData, setUserData] = useState<User[] | null>(null); // Array of User or null
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation<Navigation>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiService.getFromDatabase('all', 'test', 'users');
                setUserData(response?.all || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                Alert.alert('Error', 'Failed to load user data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.centeredContainer}>
                <Text style={styles.headerText}>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (!userData || userData.length === 0) {
        return (
            <SafeAreaView style={styles.centeredContainer}>
                <Text style={styles.headerText}>No user data found</Text>
            </SafeAreaView>
        );
    }

    const user = userData[0];
    const locationData = `${user.address} - ${user.city_name}, ${user.state_name}`;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profile}>
                <Text style={styles.profileName}>{user.username}</Text>
                <Text style={styles.profileAddress}>{locationData}</Text>
            </View>

            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>User Settings</Text>
                    <SettingOption
                        icon="globe"
                        label="Update User Data"
                        onPress={() => navigation.navigate('GoalsScreen')}
                    />
                    <SettingOption
                        icon="file-text"
                        label="Create a PDF for your finances"
                        onPress={() => {
                            // Handle PDF generation
                        }}
                    />
                    <SettingOption
                        icon="navigation"
                        label="Update Location"
                        onPress={() => navigation.navigate('ProfileScreen')}
                    />
                    <SettingOption
                        icon="dollar-sign"
                        label="Change Financial Goal"
                        onPress={() => navigation.navigate('GoalsScreen')}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resources</Text>
                    <SettingOption
                        icon="flag"
                        label="Report Bug"
                        onPress={() => Linking.openURL('mailto:zhamilt@gmu.edu')}
                    />
                    <SettingOption
                        icon="mail"
                        label="Contact Us"
                        onPress={() => Linking.openURL('mailto:zhamilt@gmu.edu')}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

type FeatherIconName = "globe" | "file-text" | "navigation" | "dollar-sign" | "chevron-right" | "flag" | "mail";

type SettingOptionProps = {
    icon: FeatherIconName;
    label: string;
    onPress: () => void;
};

const SettingOption: React.FC<SettingOptionProps> = ({ icon, label, onPress }) => {
    const iconColors: { [key in FeatherIconName]: string } = {
        globe: "#fe9400",
        "file-text": "#9b59b6",
        navigation: "#007afe",
        "dollar-sign": "#32c759",
        "chevron-right": "#C6C6C6", 
        flag: "#8e8d91",
        mail: "#007afe",
    };

    return (
        <Pressable onPress={onPress} style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: iconColors[icon] }]}>
                <FeatherIcon color="#fff" name={icon} size={20} />
            </View>
            <Text style={styles.rowLabel}>{label}</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon color={iconColors["chevron-right"]} name="chevron-right" size={20} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    profile: {
        padding: 24,
        backgroundColor: '#121212',
        alignItems: 'center',
    },
    profileName: {
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
        marginTop: 16,
    },
    sectionTitle: {
        marginBottom: 8,
        fontSize: 14,
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
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    rowLabel: {
        fontSize: 16,
        color: '#fff',
    },
    rowSpacer: {
        flex: 1,
    },
});
