const express = require('express');
const app = express();

app.use(express.static('./seeds'));

app.listen(3000, () => {
    console.log('Listening on PORT => 3000');
})