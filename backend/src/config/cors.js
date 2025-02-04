const corsOptions = (req, callback) => {
	const allowedOrigins =
	  config.env !== 'development'
		? [`http://${req.hostname}`, 'http://localhost:5173']
		: ['http://localhost:5173']; // Replace with your frontend URL
  
	const origin = req.header('Origin');
	const corsConfig = {
	  origin: allowedOrigins.includes(origin) ? origin : false,
	  credentials: true, // Allow cookies and credentials
	};
  
	if (config.env === 'production') {
	  corsConfig.sameSite = 'Strict'; // Prevent cross-site request forgery
	}
	
	// Apply the correct CORS configuration
	callback(null, corsConfig);
  };
  