import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const JournalCalendar = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [entry, setEntry] = useState('');
  const currentDate = new Date();
  const currentDay = currentDate.getDate(); // Get current day of the month
  const currentMonth = currentDate.getMonth() + 1; // Get current month (1-based)
  const currentYear = currentDate.getFullYear(); // Get current year

  const currentDateString = `${currentYear}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}-${currentDay < 10 ? '0' + currentDay : currentDay}`; // Format: yyyy-mm-dd

  // Mock journal entries
  const journalEntries = {
    '2024-12-14': 'Had a productive day learning React Native!',
    '2024-12-15': 'Worked on the calendar feature for Selene.',
    '2024-12-16': 'Took a break, had a relaxing day!',
  };

  // Function to fetch entry for the selected date
  const fetchEntryForDate = (date) => {
    const entryForDate = journalEntries[date] || 'No entry for this day';
    setEntry(entryForDate);
  };

  // Function to format date to show weekday
  const formatDateWithWeekday = (dateStr) => {
    const date = new Date(dateStr);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          fetchEntryForDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'blue' },
          [currentDateString]: { 
            selected: false, // No selection for current day
            selectedColor: 'red', // Highlight current day in red
            marked: true,
            dotColor: 'red', // Optional: add a dot on current day
            activeOpacity: 0, // Disable interaction with the current date
          },
        }}
      />
      <View style={styles.entryContainer}>
        <Text style={styles.entryTitle}>{selectedDate ? formatDateWithWeekday(selectedDate) : 'Select a date'}</Text>
        <Text style={styles.entryText}>{entry}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  entryContainer: {
    marginTop: 20,
  },
  entryTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  entryText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default JournalCalendar;
