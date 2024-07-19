import db from './db';

export default function handler(req, res) {
  db.query('SELECT id,question, option1, option2, option3, option4, correct_option FROM questions', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
      console.log(err);
    } else {
      res.status(200).json(results);
    }
  });
}
