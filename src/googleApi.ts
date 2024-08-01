import { gapi } from 'gapi-script';

const API_KEY = 'YOUR_API_KEY';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

export const initClient = (): void => {
  if (typeof window !== 'undefined') {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
      }).then(() => {
        console.log('Google API client initialized.');
      }, (error: any) => {
        console.error("Error initializing Google API client", error);
      });
    });
  }
};

export const listPublicEvents = (calendarId: string): Promise<any> => {
  if (typeof window !== 'undefined') {
    return gapi.client.calendar.events.list({
      'calendarId': calendarId,
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    });
  }
  return Promise.reject("Window is not defined");
};
