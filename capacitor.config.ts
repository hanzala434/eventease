import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'eventease',
  webDir: 'build',
  server:{
    url:'http://192.168.100.10:3000',
    cleartext: true
  }

};

export default config;
