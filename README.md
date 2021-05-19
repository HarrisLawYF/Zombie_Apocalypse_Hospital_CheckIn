# Instruction for Webapp

## Running instructions
- Setup node environment
- issue "npm install"
- issue "npm run build" for production environment or issue "npm start" for development environment


# Instruction for API server

## Running instructions
- Setup node environment
- issue "npm install"
- issue "npm start"

## Unit testing instructions
- issue "npm test"

## Brief documentation for API services
- GET /illnesses
    - Body: N/A
    - Response: [{"illness":{"name":STRING,"id":NUMBER},"_links":{"illnesses":{"href":STRING},"self":{"href":STRING}}}]
- POST /waitlist
    - Body: {"name": STRING, "illness": NUMBER, illness ID, "pain": NUMBER, 0 to 4}
    - Response: [{"patientCount": NUMBER,"levelOfPain": NUMBER,"averageProcessTime": NUMBER,"hospital": STRING,"waitTime": NUMBER}]
