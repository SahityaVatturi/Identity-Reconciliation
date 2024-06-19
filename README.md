# Identity-Reconciliation

Backend Implementation of Identity Reconciliation

## Usage

To test the API, paste this URL in Postman:

https://identity-reconciliation-fl1w.vercel.app/identity-reconciliation/v1/identify

### Sample Body

```json
{
  "phoneNumber": "9876543210", // must be a 10 digit number
  "email": "sample123@gmail.com"
}
```

## Running Locally

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/SahityaVatturi/Identity-Reconciliation.git
   ```

2. Navigate to the project directory:

   ```bash
   cd identity-reconciliation
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project and add the following environment variables:

   ```
   PORT=your_port_number
   MONGODB_KEY=your_mongodb_connection_string
   ```

5. Start the application:

   ```bash
   npm start
   ```

Make sure to replace `your_port_number` with the port number you want to use and `your_mongodb_connection_string` with your actual MongoDB connection string.
