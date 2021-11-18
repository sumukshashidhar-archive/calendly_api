# calendly_api
A simple API to create one-off meetings in calendly.

# To run

Use docker.



# Env File

As this is just an API wrapper for simplification purposes, there are a few constants that need to be defined for this to run properly

### USERURI

The Calendly Link for the user object. 

### LOOKUP

A base64 encoded version of a minified JSON object containing keys and corresponding values for various types of meetings and their resource links.

### TOKEN

Access Token from Calendly Developer Page

### PORT

Port to run the application on. 
