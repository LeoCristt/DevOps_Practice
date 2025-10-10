const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/receive', (req, res) => {
  const data = req.body;
  console.log('Получены данные от service-b:', data);
  res.status(200).send({ message: 'Данные получены и обработаны', received: data });
});

app.listen(port, () => {
  console.log(`Service A запущен на порту ${port}`);
});