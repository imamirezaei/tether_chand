# Tetherchand

Tetherchand is a Node.js-based platform that aggregates and displays Tether (USDT) prices from multiple Iranian cryptocurrency exchanges. By collecting data from various sources, Tetherchand enables users to make informed decisions by comparing buy and sell prices across different exchanges.

## Project Idea and Purpose

In the volatile cryptocurrency market, prices can vary significantly between exchanges. Tetherchand addresses this by providing a centralized platform where users can see up-to-date USDT prices from several major Iranian exchanges. By collecting real-time data, Tetherchand helps users identify the best prices for buying or selling Tether, enhancing their decision-making process. The platform integrates with APIs from exchanges like OK-EX, Nobitex, Aban-tether, and others, standardizing the data to ensure consistent and accurate comparisons.

### Features

- **Real-time Data Aggregation**: Fetches the latest USDT buy and sell prices from multiple exchanges.
- **Data Standardization**: Parses and structures data from each exchange’s API to a consistent format for easy comparison.
- **Dockerized Deployment**: The project is Dockerized, making deployment easy and consistent across environments.
- **Scalable Architecture**: Modular structure supports easy addition of new exchanges and API integrations.

---

## Setup Instructions

### Prerequisites

- **Node.js** and **npm** installed on your machine
- **MongoDB** for data storage
- **Docker** (if you plan to use Docker for deployment)

### Installation

1. **Clone the Repository**

```bash
git clone https://github.com/imamirezaei/tether_chand.git
cd tetherchand
cd app
npm i
```

Set Up Environment Variables Create a .env file in the root directory based on .env.example and provide the necessary API keys and MongoDB connection details.

Without Docker: Start the app directly with Node.js:

```bash
node src/index.js
```

With Docker:

```bash
docker compose up -d
```

Usage
The application will fetch data from multiple exchanges at intervals specified in the .env file. The fetched prices are then saved in MongoDB and logged to the console and a log file.

Key Files
exchanges.js: Lists all supported exchanges and their API details.
fetchDataController.js: Fetches data from each exchange and stores it in MongoDB.
logger.js: Configures the logging settings and file paths.
Example of Accessing Data
You can access the saved data directly from MongoDB, or use a frontend connected to this backend to visualize and display the prices in a user-friendly format.

Deployment
For a production environment, follow these additional steps:

Use a More Secure Storage for Secrets: Move API keys and tokens to a secure store.
Enable HTTPS: Secure all communications.
Set Up Monitoring and Logging: Use external monitoring tools like Prometheus or Grafana.
Optimize Docker Setup: Consider multi-stage builds for a leaner Docker image.
Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to add new features, fix bugs, or improve documentation.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Tetherchand enables users to make better trading decisions in Iran’s cryptocurrency market by offering real-time USDT price comparisons across exchanges. It’s a helpful tool for anyone looking to optimize their Tether transactions.
