import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from 'expo-router';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [organiserName, setOrganiserName] = useState('');
  const [location, setLocation] = useState('');
  const [venue, setVenue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [totalMembers, setTotalMembers] = useState('');
  const [aboutEvent, setAboutEvent] = useState('');
  const [foodAvailable, setFoodAvailable] = useState(false);
  const [dressCodeAvailable, setDressCodeAvailable] = useState(false);
  const [dressCode, setDressCode] = useState('');
  const navigation = useNavigation();
  const handleSubmit = async () => {
    const payload = {
      programName: eventName,
      userName: organiserName,
      location: location,
      startDate: startDate,
      endDate: endDate,
      budget: parseInt(budget),
      totalMembers: parseInt(totalMembers),
      about: aboutEvent,
      foodAvailable: foodAvailable,
      dressCodeAvailable: dressCodeAvailable,
      dressCode: dressCodeAvailable ? dressCode : '',
      venueName: venue,
      userId: '680a69f6a3eb0188797cbe05',
    };

    try {
      const response = await axios.post('https://socket.hindwana.com/api/events', payload);
      if (response.status === 201) {
        alert('Event Created Successfully!');
        navigation.navigate('createevent')
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.heading}>Create Event</Text>    */}
      
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />
      <TextInput
        style={styles.input}
        placeholder="Organiser Name"
        value={organiserName}
        onChangeText={setOrganiserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Venue"
        value={venue}
        onChangeText={setVenue}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Date (YYYY-MM-DD)"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        style={styles.input}
        placeholder="End Date (YYYY-MM-DD)"
        value={endDate}
        onChangeText={setEndDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Budget"
        keyboardType="numeric"
        value={budget}
        onChangeText={setBudget}
      />
      <TextInput
        style={styles.input}
        placeholder="Total Members"
        keyboardType="numeric"
        value={totalMembers}
        onChangeText={setTotalMembers}
      />
      <TextInput
        style={styles.input}
        placeholder="About Event"
        value={aboutEvent}
        onChangeText={setAboutEvent}
        multiline
      />
      
      <View style={styles.switchContainer}>
        <Text>Food Available</Text>
        <Switch
          value={foodAvailable}
          onValueChange={setFoodAvailable}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text>Dress Code Available</Text>
        <Switch
          value={dressCodeAvailable}
          onValueChange={setDressCodeAvailable}
        />
      </View>

      {dressCodeAvailable && (
        <TextInput
          style={styles.input}
          placeholder="Dress Code Name"
          value={dressCode}
          onChangeText={setDressCode}
        />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: 'rgb(255, 87, 34)', // Use RGB for the button color
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20, 
    alignItems: 'center',
    marginBottom: 50
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
});

export default CreateEvent;
