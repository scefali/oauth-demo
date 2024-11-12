# OAuth Demo App

## Getting Started

To set up the project, follow these steps:


1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with any necessary configuration values.

3. **Run the application**:
   ```bash
   npm dev
   ```

4. **Open your browser**:
   - Navigate to `http://localhost:5173` to view the app.

5. **Interact with the App**:
   - **Click the OAuth Button**:
     - Once the app is loaded, click the "Open OAuth" button to initiate the OAuth process. This will open a new window for authentication.
   - **Check Session**:
     - After completing the OAuth process, click the "Check Session" button to verify your session status. The result will be displayed on the page, indicating whether you are "Authorized" or "Not Authorized".
