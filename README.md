# FactoryFour Coding Challenge 🚀

Doing this just for fun!

## Description

**OBJECTIVE**: Write a status page for the FactoryFour APIs.
STACK: This should be a single-page web application written using React in either TypeScript or JavaScript. HTTP calls can be made using any library.

**DETAILS**:
Each of our APIs has a health status endpoint that the public can query without authentication.
For a successful request, each status endpoint will return four values:
success (boolean)
message (string)
hostname (string)
time (number)
Your page should request the health status of each API every 15 seconds, always displaying the most recent result for each API.
The endpoint URLs are of the form https://api.factoryfour.com/API_NAME/health/status where API_NAME is one of:
accounts assets customers datapoints devices documents forms invites media messages namespaces orders patients relationships rules templates users workflows

**NOTES**:
One of the APIs is deprecated and will always return a 503 error. This information should be displayed on your status page as if it were a real outage.
The hostname string returned by the API is partially random and a new hostname will be generated for each call. The most recent hostname should be displayed.

**DESIGN CONCERNS**:
Our customers want simple, legible solutions. This status page doesn't have to look impressive or convey a brand identity, but it does have to be extremely easy to read and understand.

> The code should be easy to read, understand, and change. For example, a customer success rep might need to change the 15-second interval to a 10-second interval. Someone with a limited working knowledge of JS should be able to find that line of code, change it on a branch in GitLab, and tag you for approval. Choose variable and file names that will help people grok your code with minimal effort.