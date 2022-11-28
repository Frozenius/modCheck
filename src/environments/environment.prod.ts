export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyCOkX3xolqhVwELkKk9zbDcTNJMrWgAmDw',
    authDomain: 'modcheck-3d856.firebaseapp.com',
    projectId: 'modcheck-3d856',
    storageBucket: 'modcheck-3d856.appspot.com',
    messagingSenderId: '478237935423',
    appId: '1:478237935423:web:ca2a1b13001703fbb7758a',
  },
  twitchConfig: {
    tokenHost: 'https://id.twitch.tv',
    redirect: 'https://modcheck.de',
    tokenPath: '/oauth2/token',
    authorizePath: '/oauth2/authorize',
    revokePath: '/oauth2/revoke',
    clientId: 'pcsw71tk7yvyd1lpt21vjgu7d4wfg2',
    clientSecret: 'sedgtn5cl4c24vjyxx15eetvdscgmd',
  },
  supabaseConfig: {
    twitchRedirect: 'https://dhzgkrnqefxapcwtlhje.supabase.co/auth/v1/callback',
    projectUrl: 'https://dhzgkrnqefxapcwtlhje.supabase.co',
    apiKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoemdrcm5xZWZ4YXBjd3RsaGplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk0ODE0NDUsImV4cCI6MTk4NTA1NzQ0NX0.mnVPBxcmxbmFkJAdZxwdJad13sOXiIaLfwZkAqhWsL8',
  },
};
