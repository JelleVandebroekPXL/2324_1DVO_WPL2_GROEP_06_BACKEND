require('dotenv').config({ path: '.eth' });

const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require("nodemailer");

// const corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200
// };
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

console.log("Key: " + process.env.SUPABASE_KEY);

const {createClient} = require('@supabase/supabase-js');
const url = "https://lmmyakosessaktskgwpb.supabase.co";
const key = process.env.SUPABASE_KEY;
const supabase = createClient(url, key);

//Your routes go here

app.listen(3000, () => {
    console.log('Server running on port 3000');
});


const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    }
});


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => console.log(`Server start op poort ${port}`));

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

app.get('/api/favorieten', (req, res) => {
    supabase
        .from('favorieten')
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

app.post('/api/favorieten/', (req, res) => {
    const userData = req.body;
    console.log(req.body);
    const {
        productid
    } = userData[0];

    const userForInsertion = {
        productid
    };

    supabase
        .from('favorieten')
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

// Assuming you've set up Supabase and initialized the client

app.post('/api/login', async (req, res) => {
    const { useremail, userwachtwoord } = req.body;

    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('useremail', useremail)
            .eq('userwachtwoord', userwachtwoord)
            .single();

        if (error) {
            throw error; // Throw the error received from Supabase
        }

        if (!data) {
            throw new Error('Invalid credentials');
        }

        // Authentication successful
        res.status(200).json({ redirectURL: '/' });

    } catch (error) {
        console.error('Login failed:', error.message);
        res.status(401).json({ message: 'Login failed. Please check your credentials.' });
    }
});

app.get('/api/product/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('producten')
            .select('*')
            .eq('productid', id)
            .single();

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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

app.post('/api/users/', (req, res) => {
    const userData = req.body;
    console.log(req.body);
    const {
        uservoornaam,
        userachternaam,
        useremail,
        isman,
        userwachtwoord,
        nieuwpermail,
    } = userData[0];

    const userForInsertion = {
        uservoornaam,
        userachternaam,
        useremail,
        isman,
        userwachtwoord,
        nieuwpermail,
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

app.listen(3001, () => {
    console.log(`Example app listening on port ${port}`);
});

app.post('/new', (req, res) => {
    const {name, email} = req.body;
    const token = Math.floor(Math.random() * 100000000);

    supabase
        .from('subscriptions')
        .select('*')
        .eq('email', email)
        .then(({data, error}) => {
            if (error) {
                return res.status(500).json({error: 'Internal Server Error Fetching Subscriptions'});
            }

            if (data.length === 0) {
                supabase
                    .from('subscriptions')
                    .insert([{name, email, confirmed: false, token}])
                    .then(({data, error}) => {
                        if (error) {
                            console.log(error)
                            return res.status(500).json({error: 'Internal Server Error Inserting Into DB'});
                        }
                        const baseUrl = 'https://two324-1dvo-wpl2-groep-06-backend-1.onrender.com/confirm'; // Basis-URL
                        const tokenQueryParam = new URLSearchParams({ token }); // Maak een nieuw URLSearchParams-object met de token als queryparameter

                        const urlWithQueryParam = `${baseUrl}?email=${email}&${tokenQueryParam.toString()}`;

                        console.log(urlWithQueryParam);

                        const mailOptions = {
                            from: process.env.EMAIL_ADDRESS,
                            to: email,
                            subject: 'Confirm Your Subscription',
                            text: `Click the following link to confirm your subscription: ${urlWithQueryParam}`
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log('Error sending email:', error);
                                return res.status(500).json({error: 'Failed to send confirmation email'});
                            }
                            return res.status(201).json({message: 'Confirmation email sent successfully'});
                        });
                    });
            } else {
                return res.status(400).json({message: 'This email is already subscribed to our newsletter'});
            }
        });
});

app.get('/confirm', (req, res) => {
    const { email, token } = req.query;
    console.log(email, token);
    supabase
        .from('subscriptions')
        .select('token')
        .eq('email', email)
        .then(({ data, error }) => {
            console.log('Data:', data);
            console.log('Error:', error);
            if (error) {
                return res.status(500).json({ error: 'Internal Server Error Matching Token And Email' });
            }

            supabase
                .from('subscriptions')
                .update({ confirmed: true })
                .eq('email', email)
                .then(({ data, error }) => {
                    if (error) {
                        return res.status(500).json({ error: 'Internal Server Error Updating "confirmed" Column' });
                    }
                    console.log("user confirmed");
                    return res.status(301).redirect(`https://comfortmeubel.netlify.app/confirm/${token}`);
                });
        });
});

app.delete('/unsubscribe/:token', (req, res) => {
    const {token} = req.params;

    supabase
        .from('subscriptions')
        .delete()
        .eq('token', token)
        .then(({data, error}) => {
            if (error) {
                return res.status(500).json({error: 'Internal Server Error Finding Token'});
            }
            if (data.length === 0) {
                return res.status(404).json({message: 'Subscription not found'});
            }
            return res.status(201).json({message: 'Subscription unsubscribed successfully'});
        })
        .catch(err => {
            console.error('Error unsubscribing:', err);
            return res.status(500).json({error: 'Internal Server Error Unsubscribing'});
        });
});