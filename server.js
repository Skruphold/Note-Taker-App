const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require('./routes/htmlroute')(app);

app.listen(PORT, () => console.log(`App listening on port http://localhost:${PORT}`));