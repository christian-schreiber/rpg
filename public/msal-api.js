document.addEventListener('DOMContentLoaded', () => {
    const MSAL_CONFIG = {
      auth: {
        clientId: 'db788f68-6a9c-4a34-b3e6-0a2adca36b1c',
        authority: 'https://login.microsoftonline.com/630a260f-04bd-4d65-a04d-f922f6c2c4a0',
        redirectUri: window.location.origin + '/game.html'
      }
    };
  
    const MSAL_INSTANCE = new msal.PublicClientApplication(MSAL_CONFIG);
  
    MSAL_INSTANCE.handleRedirectPromise().then(() => {
      if (MSAL_INSTANCE.getAllAccounts().length === 0) {
        // User is not logged in, redirect to the login page
        window.location.href = 'index.html';
      }
    });
  
    const logoutButton = document.getElementById('logoutButton');
    const sendToAPIButton = document.getElementById('sendToAPI');
    const textInput = document.getElementById('textInput');
  
    logoutButton.addEventListener('click', handleLogout);
    sendToAPIButton.addEventListener('click', handleSendToAPI);
  
    async function handleLogout() {
      try {
        await MSAL_INSTANCE.logout();
        loginSection.style.display = 'block';
        userInfoSection.style.display = 'none';
      } catch (error) {
        console.error('Error during logout:', error);
        alert('Error during logout. Please try again.');
      }
    }
  
    async function handleSendToAPI() {
      const inputValue = textInput.value;
  
      // Hier den Code einfügen, um die Daten an die API zu senden
      // Beispiel:
      const apiUrl = 'https://azure-logic-app-api.azure-api.net/manual/paths/invoke';
      const requestBody = { content: inputValue };
  
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Ocp-Apim-Subscription-Key': process.env.API_KEY
          },
          body: JSON.stringify(requestBody)
        });
  
        if (response.ok) {
          console.log('Data sent to API successfully');
        } else {
          console.error('Error sending data to API:', response.statusText);
          alert('Error sending data to API. Please try again.');
        }
      } catch (error) {
        console.error('Error sending data to API:', error);
        alert('Error sending data to API. Please try again.');
      }
    }
  });