// src/plugins/vuetify.js
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { mdi } from 'vuetify/iconsets/mdi';

const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1E88E5', // Example primary color
          secondary: '#FFC107', // Example secondary color
          // Add more colors as needed
        },
      },
    },
  },
  icons: {
    defaultSet: mdi,
  },
});

export default vuetify;
