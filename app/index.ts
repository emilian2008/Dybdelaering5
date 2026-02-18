import express from 'express';

const app = express();
const port = process.env.PORT || 8081;

app.get('/', (_req, res) => {
  res.send('Hello from TypeScript app');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});
