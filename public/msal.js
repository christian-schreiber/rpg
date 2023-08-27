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
            scopes: ['user.read', 'email']
        };

        try {
const authResult = await MSAL_INSTANCE.loginPopup(loginRequest);
const accessToken = authResult.accessToken;

// Use the access token to make a request to Microsoft Graph API
console.log('Before fetch');
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
    console.error('Error retrieving user information:', response.statusText);
    alert('Error retrieving user information. Please try again.');
}
} catch (error) {
console.error('Error during login:', error);
alert('Error during login. Please try again.');
}
      }
    });