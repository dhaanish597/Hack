const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World! Server is working!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`);
}); 