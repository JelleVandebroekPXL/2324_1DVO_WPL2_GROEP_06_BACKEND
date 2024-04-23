const express = require('express');
const app = express();
const port = 3000;
const url = "https://lmmyakosessaktskgwpb.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtbXlha29zZXNzYWt0c2tnd3BiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTQ0Mjk3NiwiZXhwIjoyMDI3MDE4OTc2fQ.28CxKKBEbf3YIZS2hOkw-XoENRvpuKxYlwFmDqZPqgA";

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use(express.json());
app.listen(3000, () => console.log("Server start op poort 3000"));

const {createClient} = require('@supabase/supabase-js');
const fs = require("fs");
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
            res.status(500).json({
                message: 'Error reading from Database: ' +
                    error.message
            });
        });
});

app.get('/api/users', (req, res) => {
    supabase
        .from('users')
        .select('*')
        .then(response => {
            console.log(response);
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error reading from Database: ' +
                    error.message
            });
        });
});

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
            res.status(500).json({
                message: 'Error reading from Database: ' +
                    error.message
            });
        });
});

app.get('/api/winkelmand', (req, res) => {
    supabase
        .from('winkelmand')
        .select('*')
        .then(response => {
            console.log(response);
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error reading from Database: ' +
                    error.message
            });
        });
});

app.get('/api/producten', (req, res) => {
    supabase
        .from('producten')
        .select('*')
        .then(response => {
            console.log(response);
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error reading from Database: ' +
                    error.message
            });
        });
});

app.get('/api/producten/:id', (req, res) => {
    supabase
        .from('producten')
        .select('*')
        .eq('productid', req.params.id)
        .then(response => {
            console.log(response);
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error reading from Database: ' +
                    error.message
            });
        });
});

app.get('/api/winkelmand/:id', (req, res) => {
    supabase
        .from('winkelmand')
        .select('*')
        .eq('id', req.params.id)
        .then(response => {
            console.log(response);
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error reading from Database: ' +
                    error.message
            });
        });
});

app.get('/api/subscriptions/:id', (req, res) => {
    supabase
        .from('subscriptions')
        .select('*')
        .eq('id', req.params.id)
        .then(response => {
            console.log(response);
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error reading from Database: ' +
                    error.message
            });
        });
});

app.get('/api/users/:id', (req, res) => {
    supabase
        .from('users')
        .select('*')
        .eq('userid', req.params.id)
        .then(response => {
            console.log(response);
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error reading from Database: ' +
                    error.message
            });
        });
});

app.post('/api/users/', (req, res) => {
    const userData = req.body;
    console.log(req.body);
    const {
        userid,
        uservoornaam,
        userachternaam,
        useremail,
        isman,
        userwachtwoord,
        nieuwpermail,
        subscriptionid
    } = userData[0];

    const userForInsertion = {
        userid,
        uservoornaam,
        userachternaam,
        useremail,
        isman,
        userwachtwoord,
        nieuwpermail,
        subscriptionid
    };

    supabase
        .from('users')
        .insert(userForInsertion)
        .then(response => {
            console.log('Insert response:', response);
            res.status(200).json({message: 'User added successfully', data: response.body});
        })
        .catch(error => {
            console.error('Error adding user:', error);
            res.status(500).json({message: 'Error adding user: ' + error.message});
        });
});

app.post('/api/producten/', (req, res) => {
    const productData = req.body;
    console.log(req.body);

    const { productid, producttitel, productomschrijving, productafbeelding } = productData[0];

    const productForInsertion = {
        productid,
        producttitel,
        productomschrijving,
        productafbeelding
    };

    supabase
        .from('producten')
        .insert(productForInsertion)
        .then(response => {
            console.log('Insert response:', response);
            res.status(200).json({ message: 'Product added successfully', data: response.body });
        })
        .catch(error => {
            console.error('Error adding product:', error);
            res.status(500).json({ message: 'Error adding product: ' + error.message });
        });
});

app.post('/api/subscriptions/', (req, res) => {
    const subscriptionData = req.body;

    const { id, name, email, confirmed, userid } = subscriptionData[0];

    const subscriptionForInsertion = {
        id,
        name,
        email,
        confirmed,
        userid
    };

    supabase
        .from('subscriptions')
        .insert(subscriptionForInsertion)
        .then(response => {
            console.log('Insert response:', response);
            res.status(200).json({ message: 'Subscription added successfully', data: response.body });
        })
        .catch(error => {
            console.error('Error adding subscription:', error);
            res.status(500).json({ message: 'Error adding subscription: ' + error.message });
        });
});

app.post('/api/winkelmand/', (req, res) => {
    const winkelmandData = req.body;

    const { id, productid, aantal } = winkelmandData[0];

    const winkelmandForInsertion = {
        id,
        productid,
        aantal
    };

    supabase
        .from('winkelmand')
        .insert(winkelmandForInsertion)
        .then(response => {
            console.log('Insert response:', response);
            res.status(200).json({ message: 'Item toegevoegd aan winkelmand', data: response.body });
        })
        .catch(error => {
            console.error('Error adding winkelmand:', error);
            res.status(500).json({ message: 'Error met het toevoegen aan de winkelmand: ' + error.message });
        });
});

app.put('/api/winkelmand/:id', (req, res) => {
    const itemId = req.params.id;
    const newAantal = req.body[0].aantal;

    supabase
        .from('winkelmand')
        .update({ aantal: newAantal })
        .eq('id', itemId)
        .then(response => {
            console.log('Update response:', response);
            if (response.body == "") {
                res.status(404).json({ message: 'Item not found' });
            } else {
                res.status(200).json({ message: 'Aantal updated successfully', data: response.body });
            }
        })
        .catch(error => {
            console.error('Error updating aantal:', error);
            res.status(500).json({ message: 'Error updating aantal: ' + error.message });
        });
});

app.delete('/api/subscriptions/:id', (req, res) => {
    const subscriptionId = req.params.id;

    supabase
        .from('subscriptions')
        .delete()
        .eq('id', subscriptionId)
        .then(response => {
            console.log('Delete response:', response);
            if (response.body == "") {
                res.status(404).json({ message: 'Subscription not found' });
            } else {
                res.status(200).json({ message: 'Subscription deleted successfully', data: response.body });
            }
        })
        .catch(error => {
            console.error('Error deleting subscription:', error);
            res.status(500).json({ message: 'Error deleting subscription: ' + error.message });
        });
});