import db from './db';

export default function handler(req, res) {
  db.query('SELECT question, option1, option2, option3, option4, correctopt FROM questions', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
    } else {
      res.status(200).json(results);
    }
  });
}
