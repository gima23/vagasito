const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Configurazione della connessione al database MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'gima',
  password: '9761',
  database: 'vagamondo',
});

// Connessione al database
connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
  } else {
    console.log('Connessione al database MySQL riuscita!');
  }
});

// Middleware per servire file statici dalla cartella 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Route per la registrazione degli utenti
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Verifica se l'utente esiste già
  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Errore nella query del database.' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Username già in uso.' });
    }

    // Salva l'utente nel database
    connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Errore nell\'inserimento dell\'utente nel database.' });
      }

      res.json({ success: true });
    });
  });
});

// Altri endpoint e route...

// Chiudi la connessione al database quando il server si ferma
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
