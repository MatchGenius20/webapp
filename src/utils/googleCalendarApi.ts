// src/utils/googleCalendarApi.ts
import fs from 'fs';
import readline from 'readline';
import { google, calendar_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'token.json';

interface Credentials {
  installed: {
    client_secret: string;
    client_id: string;
    redirect_uris: string[];
  };
}

export function authorize(credentials: Credentials, callback: (auth: OAuth2Client) => void): void {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token as unknown as string));
    callback(oAuth2Client);
  });
}

function getAccessToken(oAuth2Client: OAuth2Client, callback: (auth: OAuth2Client) => void): void {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code: string) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token as any);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

export function listEvents(auth: OAuth2Client, callback: (events: calendar_v3.Schema$Event[]) => void): void {
  const calendar = google.calendar({ version: 'v3', auth });
  calendar.events.list(
    {
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    },
    (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res?.data?.items;
      if (events && events.length) {
        callback(events);
      } else {
        console.log('No upcoming events found.');
        callback([]);
      }
    }
  );
}
