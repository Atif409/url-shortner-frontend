<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>URL Shortener</title>
    <link rel="stylesheet" href="styles.css"> <!-- Link to your CSS file -->
</head>
<body>
    <header>
        <h1>URL Shortener</h1>
        <nav>
            <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#prerequisites">Prerequisites</a></li>
                <li><a href="#installation">Installation</a></li>
                <li><a href="#build">Build for Production</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="features">
            <h2>Features</h2>
            <ul>
                <li><strong>User Authentication:</strong> Sign Up, Login, Forgot Password, and Change Password functionalities.</li>
                <li><strong>URL Shortening:</strong> Create shortened URLs with optional custom aliases, expiration times, and passwords.</li>
                <li><strong>Smart Links:</strong> Create personalized URLs based on the user's device, platform, and location.</li>
                <li><strong>Link Management:</strong> Edit, delete, and track links with analytics.</li>
                <li><strong>QR Code Generation:</strong> Generate QR codes for shortened URLs.</li>
                <li><strong>Profile Settings:</strong> Update user information.</li>
                <li><strong>Analytics:</strong> Track clicks, devices, and other metrics (backend ready, frontend integration pending).</li>
            </ul>
        </section>

        <section id="prerequisites">
            <h2>Prerequisites</h2>
            <p>Make sure you have the following installed:</p>
            <ul>
                <li>Node.js (v14.x or later)</li>
                <li>npm or yarn (latest version)</li>
            </ul>
        </section>

        <section id="installation">
            <h2>Installation</h2>
            <ol>
                <li>
                    <strong>Clone the repository</strong>
                    <pre><code>git clone https://github.com/yourusername/url-shortener.git</code></pre>
                </li>
                <li>
                    <strong>Navigate to the project directory</strong>
                    <pre><code>cd url-shortener</code></pre>
                </li>
                <li>
                    <strong>Install dependencies</strong>
                    <p>Using npm:</p>
                    <pre><code>npm install</code></pre>
                    <p>Or using yarn:</p>
                    <pre><code>yarn install</code></pre>
                </li>
                <li>
                    <strong>Create a .env file</strong>
                    <p>In the root directory, create a <code>.env</code> file to store environment variables. You may need to add variables such as API endpoints or authentication keys, depending on your setup.</p>
                    <p>Example:</p>
                    <pre><code>REACT_APP_API_URL=https://api.yourbackend.com</code></pre>
                </li>
                <li>
                    <strong>Start the development server</strong>
                    <p>Using npm:</p>
                    <pre><code>npm start</code></pre>
                    <p>Or using yarn:</p>
                    <pre><code>yarn start</code></pre>
                    <p>This will start the app in development mode and open it in your default browser at <code>http://localhost:3000</code>.</p>
                </li>
            </ol>
        </section>

        <section id="build">
            <h2>Build for Production</h2>
            <p>To create an optimized production build, run:</p>
            <p>Using npm:</p>
            <pre><code>npm run build</code></pre>
            <p>Or using yarn:</p>
            <pre><code>yarn build</code></pre>
            <p>The production build will be output in the <code>build/</code> directory.</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 URL Shortener. All rights reserved.</p>
    </footer>
</body>
</html>
