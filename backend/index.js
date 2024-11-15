
const express = require('express'); 
const pool = require('./db');
const cors = require('cors');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); // Import JSON Web Tokens
const { secretKey } = require('./config'); // Get your secret key from config


const app = express();
const port = '3000';

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware (Improved)
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid or expired token' }); // More specific error
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: 'Authorization header missing' }); // More specific error
  }
};


// API Routes

// Signup Route (add input validation!!)
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Input Validation (Essential - add more checks as needed)
        if (!name || !email || !password) {
          return res.status(400).json({ error: 'All fields are required' });
        }
        // ... other validation (email format, password complexity, etc.)

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: 'User created', userId: result.rows[0].id });

      } catch (error) {
        console.error('Error creating user', error);

        if (error.code === '23505') { // Unique constraint violation (duplicate email)
          return res.status(409).json({ error: 'Email already exists' }); // Use appropriate status code
        }

        res.status(500).json({ error: 'Failed to create user' });
      }

});
// API Route
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        console.log('result.rows:', result.rows); 
        res.json(result.rows);
    } 
    catch (error) {
        console.error('Error fetching users:', error); // Log the error details
        res.status(500).json({ error: 'Failed to retrieve users: ' + error.message }); 
    }
});

// Get all packages
app.get('/api/packages', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM packages'); // Replace 'packages' with your table name
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Get a single package by ID
  app.get('/api/packages/:id', async (req, res) => {
    const packageId = parseInt(req.params.id);
    try {
      const result = await pool.query('SELECT * FROM packages WHERE id = $1', [packageId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Package not found' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      // 1. Find user by email
      const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = userResult.rows[0];
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // 2. Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // 3. Generate a JWT
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });  // Set exp date
  
      res.json({ token }); // Respond with the token
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Failed to log in' });
    }
  });


// Get user profile (protected route)
app.get('/api/profile', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.userId; // Access userId from JWT payload

    const userResult = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [userId]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }


    const bookingsResult = await pool.query(
      'SELECT b.id, p.name AS "packageName", b.start_date AS "startDate", b.end_date AS "endDate", b.travelers, b.status FROM bookings b JOIN packages p ON b.package_id = p.id WHERE b.user_id = $1', // Join with packages table
      [userId]
    );


    const bookings = bookingsResult.rows;



    res.json({ ...user, bookings });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile data' });
  }
});

// API endpoint to handle contact form submissions
app.post('/api/contact', async (req, res) => {
try {
  const { name, email, message } = req.body;

  // 1. Validate input (important!)
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  // ... more validation as needed
  // Input validation if you have a transporter configured.
  // 2. Send email (using Nodemailer - you'll need to configure this)
  // ... your Nodemailer code to send the email ...

  res.json({ message: 'Message sent successfully' });
} catch (error) {
  console.error('Error sending message:', error);
  res.status(500).json({ error: 'Failed to send message' });  // Important: Send appropriate status codes
}
});


// Post a booking
app.post('/api/bookings', authenticateJWT, async (req, res) => { // Protected route
try {
  const userId = req.user.userId; // Get user ID from authenticated user
  const { name, email, travelers, startDate, endDate, packageId } = req.body;

  // Perform input validation here (essential!)
  if (!name || !email || !travelers || !startDate || !endDate || !packageId) {
    return res.status(400).json({ error: 'All fields are required' });
  }


  // Insert booking into database (using parameterized query to prevent SQL injection)
  const result = await pool.query(
    'INSERT INTO bookings (user_id, name, email, travelers, start_date, end_date, package_id, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id', 
    [userId, name, email, travelers, startDate, endDate, packageId, 'Pending'] // Default status
  );

  const bookingId = result.rows[0].id;
  res.status(201).json({ message: 'Booking created successfully', bookingId });

} catch (error) {
  console.error("Error creating booking:", error);
  res.status(500).json({ error: 'Failed to create booking' }); // Provide error information to the client
}
});


// Get all destinations
app.get('/api/destinations', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM destinations');
      res.json(destinations); // Send the destinations data
    } catch (error) {
      console.error("Error fetching destinations:", error);
      res.status(500).json({ error: 'Failed to fetch destinations' });
    }
  });



app.get('/api/destinations/:id', async (req, res) => {
  const destinationId = parseInt(req.params.id);
  try {
    // Use parameterized query for security
    const result = await pool.query('SELECT * FROM destinations WHERE id = $1', [destinationId]); 
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Destination not found' }); // Important: 404 for not found
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch destination' }); // Improve error message
  }
});




app.get('/api/blog', async (req, res) => {
try {
  const result = await pool.query('SELECT id, title, date, image_url AS "imageUrl", excerpt, content FROM blog_posts'); // Alias image_url
  res.json(result.rows);
} catch (err) {
  console.error("Error fetching blog posts:", err);
  res.status(500).json({ error: 'Failed to fetch blog posts' });
}
});


// Get a single blog post by ID
app.get('/api/blog/:id', async (req, res) => {
const postId = parseInt(req.params.id);
try {
  const result = await pool.query('SELECT * FROM blog_posts WHERE id = $1', [postId]);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Blog post not found' }); // Correct status code
  }
  res.json(result.rows[0]);
} catch (error) {
  console.error("Error fetching blog post:", error);
  res.status(500).json({ error: 'Failed to fetch blog post' }); // Be specific in errors
}
});





// Global error handler
app.use((err, req, res, next) => {
console.error(err.stack);  // Log the full error for debugging
res.status(500).json({ error: 'Internal Server Error' }); // Generic error message to the client
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
