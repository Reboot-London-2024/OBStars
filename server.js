const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

// Dialogflow configuration
const projectId = 'lbplc-reboot24lon-871'; // Replace 'your-project-id' with your Dialogflow project ID
const languageCode = 'en-US';

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle incoming messages from the front end
app.post('/message', async (req, res) => {
  const userMessage = req.body.message;
  const sessionId = uuid.v4(); // Generate a unique session ID for each request

  try {
    // Send user message to Dialogflow and get response
    const responses = await sendToDialogflow(userMessage, sessionId);

    // Extract and send bot response back to front end
    const botResponse = responses[0].queryResult.fulfillmentText;
    res.json({ message: botResponse });
  } catch (error) {
    console.error('Error sending message to Dialogflow:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to send user message to Dialogflow
async function sendToDialogflow(message, sessionId) {
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: languageCode,
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  return responses;
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
