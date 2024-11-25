import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserName } from '../../utils/getUserData';
import ApiService from '../../utils/apiService';

export default function RecommendationsScreen() {
    const userName = useUserName() || "test";
    const [recommendations, setRecommendations] = useState([]) as any[];
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrGenerateRecommendations();
    }, []);

    const fetchOrGenerateRecommendations = async () => {
        try {
            setLoading(true); // Start loading state
            const response = await ApiService.updateRecommendations(userName);

            // Ensure recommendations are properly structured
            if (response) {
                setRecommendations([
                    { title: response.rec1.title, description: response.rec1.description, gradientColors: ['#FF6B6B', '#FFD93D'] },
                    { title: response.rec2.title, description: response.rec2.description, gradientColors: ['#4ECDC4', '#556270'] },
                    { title: response.rec3.title, description: response.rec3.description, gradientColors: ['#FFD93D', '#FF6B6B'] },
                ]);
            } else {
                Alert.alert('No Recommendations', 'No recommendations were generated.');
            }
        } catch (error: any) {
            console.error('Error fetching or generating recommendations:', error.message);
            Alert.alert('Error', error.message || 'Something went wrong while generating recommendations.');
        } finally {
            setLoading(false); // End loading state
        }
    };

    const refreshRecommendations = async () => {
        try {
            setLoading(true);
            const response = await ApiService.updateRecommendations(userName);

            // Update recommendations
            if (response.recommendations) {
                setRecommendations(response.recommendations.map(rec => ({
                    title: rec.title || "No Title",
                    description: rec.description || "No Description",
                    gradientColors: ['#FF6B6B', '#FFD93D'], // Default gradient
                })));
            } else {
                Alert.alert('No Recommendations', 'No recommendations were generated.');
            }
        } catch (error) {
            console.error('Error refreshing recommendations:', error);
            Alert.alert('Error', 'Failed to refresh recommendations. Please try again later.');
        } finally {
            setLoading(false); // Ensure loading is reset
        }
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <Text style={styles.loadingText}>Loading recommendations...</Text>
            </View>
        );
    }

    if (!recommendations || recommendations.length === 0) {
        return (
            <View style={styles.centeredContainer}>
                <Text style={styles.loadingText}>No recommendations available.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
        <View style={styles.header}>
            <Image
            source={require('@/assets/images/rimg.png')}
            style={styles.headerImage}
            />
            <Text style={styles.headerTitle}>Your Top Recommendations</Text>
        </View>

        <View style={styles.recommendationsContainer}>
            {recommendations.map((rec, index) => (
                <RecommendationCard
                key={index}
                title={rec.title}
                description={rec.description}
                gradientColors={rec.gradientColors || ['#FF6B6B', '#FFD93D']}
                />
            ))}
        </View>

        <Pressable style={styles.refreshButton} onPress={refreshRecommendations}>
            <Text style={styles.refreshButtonText}>Refresh Recommendations</Text>
        </Pressable>
        </ScrollView>
    );
    }

    const RecommendationCard = ({ title, description, gradientColors }) => {
    const [expanded, setExpanded] = useState(false);
    const animatedHeight = useState(new Animated.Value(0))[0];

    const toggleExpansion = () => {
        setExpanded(!expanded);
        Animated.timing(animatedHeight, {
        toValue: expanded ? 0 : 100,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
        }).start();
    };

    return (
        <Pressable onPress={toggleExpansion} style={styles.cardContainer}>
        <LinearGradient colors={gradientColors} style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Animated.View style={[styles.cardContent, { height: animatedHeight }]}>
            <Text style={styles.cardDescription}>{description}</Text>
            </Animated.View>
        </LinearGradient>
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
    loadingText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#121212',
    },
    headerImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    recommendationsContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    cardContainer: {
        marginBottom: 16,
        borderRadius: 15,
        overflow: 'hidden',
    },
    card: {
        padding: 16,
        borderRadius: 15,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardContent: {
        marginTop: 8,
        overflow: 'hidden',
    },
    cardDescription: {
        fontSize: 14,
        color: '#fff',
    },
    refreshButton: {
        margin: 16,
        padding: 16,
        backgroundColor: '#32c759',
        borderRadius: 8,
        alignItems: 'center',
    },
    refreshButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
