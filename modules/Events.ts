import { EventEmitter } from 'expo-modules-core';

type EventsMap = {
  refreshQuestions: () => void;
  // Add other event types here as needed
};

export const events = new EventEmitter<EventsMap>();
