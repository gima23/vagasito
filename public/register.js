// public/register.js
function register() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Invia i dati al server per la registrazione
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Registration successful:', data);
    // Puoi reindirizzare l'utente a una pagina di successo o fare altro
  })
  .catch(error => {
    console.error('Error during registration:', error);
    // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
  });
}

