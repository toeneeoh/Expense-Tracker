import Ionicons from '@expo/vector-icons/Ionicons';
import FeatherIcon from '@expo/vector-icons/Feather'; {/* Might not be correct file path, check again if error thrown */ }

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Switch,
    Image,
} from 'react-native';

export default function TabTwoScreen() {
    const [form, setForm] = useState({
        darkMode: false,
        emailNotifications: true,
        pushNotifications: false,
    });

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
          <View style={styles.profile}>
              <TouchableOpacity
                  onPress={() => {
                      // handle onPress
                  }}>
              </TouchableOpacity>

              <View>
                  <Text style={styles.profileName}>John Doe</Text>

                  <Text style={styles.profileAddress}>
                      123 Somewhere Street. Fairfax, VA 22032
                  </Text>
              </View>
          </View>

          <ScrollView>
              <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Preferences</Text>

                  <TouchableOpacity
                      onPress={() => {
                          // handle onPress
                      }}
                      style={styles.row}>
                      <View style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
                          <FeatherIcon color="#fff" name="globe" size={20} />
                      </View>

                        <Text style={styles.rowLabel}>Update User Data</Text> {/* Go through onboarding process again */ }

                      <View style={styles.rowSpacer} />

                      <FeatherIcon
                          color="#C6C6C6"
                          name="chevron-right"
                          size={20} />
                  </TouchableOpacity>

                  <View style={styles.row}>
                      <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                          <FeatherIcon color="#fff" name="moon" size={20} />
                      </View>

                      <Text style={styles.rowLabel}>Dark Mode</Text>

                      <View style={styles.rowSpacer} />

                      <Switch
                          onValueChange={darkMode => setForm({ ...form, darkMode })}
                          value={form.darkMode} />
                  </View>

                  <TouchableOpacity
                      onPress={() => {
                          // handle onPress
                      }}
                      style={styles.row}>
                      <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                          <FeatherIcon
                              color="#fff"
                              name="navigation"
                              size={20} />
                      </View>

                      <Text style={styles.rowLabel}>Location</Text>

                      <View style={styles.rowSpacer} />

                      <FeatherIcon
                          color="#C6C6C6"
                          name="chevron-right"
                          size={20} />
                  </TouchableOpacity>

                  <View style={styles.row}>
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
                  </View>
              </View>

              <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Resources</Text>

                  <TouchableOpacity
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
                  </TouchableOpacity>

                  <TouchableOpacity
                      onPress={() => {
                          // handle onPress
                      }}
                      style={styles.row}>
                      <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                          <FeatherIcon color="#fff" name="mail" size={20} />
                      </View>

                      <Text style={styles.rowLabel}>Contact Us</Text>

                      <View style={styles.rowSpacer} />

                      <FeatherIcon
                          color="#C6C6C6"
                          name="chevron-right"
                          size={20} />
                  </TouchableOpacity>

                  <TouchableOpacity
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
                  </TouchableOpacity>
              </View>
          </ScrollView>
      </SafeAreaView>
  );
}

    const styles = StyleSheet.create({
        /** Profile */
        profile: {
            padding: 24,
            backgroundColor: '#121212',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        profileAvatarWrapper: {
            position: 'relative',
        },
        profileAvatar: {
            width: 72,
            height: 72,
            borderRadius: 9999,
        },
        profileAction: {
            position: 'absolute',
            right: -4,
            bottom: -10,
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: 9999,
            backgroundColor: '#007bff',
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
        /** Section */
        section: {
            paddingHorizontal: 24,
        },
        sectionTitle: {
            paddingVertical: 12,
            fontSize: 12,
            fontWeight: '600',
            color: '#9e9e9e',
            textTransform: 'uppercase',
            letterSpacing: 1.1,
        },
        /** Row */
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
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
            flexDirection: 'row',
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
            flexShrink: 1,
            flexBasis: 0,
        }
    });