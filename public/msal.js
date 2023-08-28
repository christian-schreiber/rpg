document.addEventListener('DOMContentLoaded', () => {

        fetch('/config')
          .then(response => response.json())
          .then(config => {
            const MSAL_CONFIG = {
                auth: {
                    clientId: config.clientId,
                    authority: config.authority
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
            scopes: ['user.read', 'email']
        };

        try {
    const authResult = await MSAL_INSTANCE.loginPopup(loginRequest);
    const accessToken = authResult.accessToken;


    const response = await fetch('https://graph.microsoft.com/v1.0/me', {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
    });

if (response.ok) {
    const user = await response.json();
    console.log('User object:', user);

    const userEmail = user.mail || user.userPrincipalName || 'No Email';
    userEmailElement.textContent = `Authenticated Email: ${userEmail}`;

    loginSection.style.display = 'none';
    userInfoSection.style.display = 'block';

    window.location.href = 'game.html';
} else {
    alert('Error retrieving user information. Please try again.');
}
} catch (error) {
alert('Error during login. Please try again.');
}
      }


    })
    .catch(error => console.error('Error fetching config:', error)); 

    });