const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/send', async (req, res) => {
  const dataToSend = { message: 'Привет от service-b!', timestamp: new Date().toISOString() };

  try {
    // В Node 18+ есть глобальный fetch
    const response = await fetch('http://service-a:3000/receive', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });

    // Корректно обрабатываем JSON или текстовый ответ
    const ct = response.headers.get('content-type') || '';
    const result = ct.includes('application/json') ? await response.json() : await response.text();

    console.log('Ответ от service-a:', result);
    res.status(response.ok ? 200 : response.status).json({ sent: dataToSend, response: result });
  } catch (error) {
    console.error('Ошибка при отправке:', error);
    res.status(500).json({ error: 'Ошибка связи' });
  }
});

app.listen(port, () => {
  console.log(`Service B запущен на порту ${port}`);
});
