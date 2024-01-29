// public/login.js
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Invia i dati al server per il login
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Login successful:', data);
    // Puoi reindirizzare l'utente a una pagina di successo o fare altro
  })
  .catch(error => {
    console.error('Error during login:', error);
    // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
  });
}
