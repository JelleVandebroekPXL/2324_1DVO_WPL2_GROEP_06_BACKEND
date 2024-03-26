const express = require('express');
const app = express();
const port = 3000;
const url = "https://lmmyakosessaktskgwpb.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtbXlha29zZXNzYWt0c2tnd3BiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTQ0Mjk3NiwiZXhwIjoyMDI3MDE4OTc2fQ.28CxKKBEbf3YIZS2hOkw-XoENRvpuKxYlwFmDqZPqgA";
app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(url, key);

app.get('/api/subscriptions', (req, res) => {
    supabase
        .from('subscriptions')
        .select('*')
        .then(response => {
            console.log(response);
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'Error reading from Database: ' +
                    error.message});
        });
});