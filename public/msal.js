document.addEventListener('DOMContentLoaded', () => {
    const MSAL_CONFIG = {
      auth: {
        clientId: 'db788f68-6a9c-4a34-b3e6-0a2adca36b1c',
        authority: 'https://login.microsoftonline.com/630a260f-04bd-4d65-a04d-f922f6c2c4a0'
      }
    };
  
    const MSAL_INSTANCE = new msal.PublicClientApplication(MSAL_CONFIG);  
    const loginButton = document.getElementById('loginButton');
    const loginSection = document.getElementById('loginSection');
    const userInfoSection = document.getElementById('userInfoSection');
    const userEmailElement = document.getElementById('userEmail');
  
    loginButton.addEventListener('click', handleLogin);
  
    async function handleLogin() {
      const loginRequest = {
        scopes: ['openid', 'profile']
      };
  
      try {
        const authResult = await MSAL_INSTANCE.loginPopup(loginRequest);
        const idToken = authResult.idToken;
  
        // Use the id token to authenticate the user on the server-side
        const response = await fetch('/api/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ idToken })
        });
  
        if (response.ok) {
          const user = await response.json();
          console.log('User object:', user);
  
          const userEmail = user.email || 'No Email';
          userEmailElement.textContent = `Authenticated Email: ${userEmail}`;
  
          loginSection.style.display = 'none';
          userInfoSection.style.display = 'block';
        } else {
          console.error('Error authenticating user:', response.statusText);
          alert('Error authenticating user. Please try again.');
        }
      } catch (error) {
        console.error('Error authenticating user:', error);
        alert('Error authenticating user. Please try again.');
      }
    }
});

