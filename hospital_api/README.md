# Instruction to run the app

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

