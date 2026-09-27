# 🏨 Hotel Booking Chatbot — Amazon Lex V2 + AWS Lambda

A conversational hotel-booking chatbot built using **Amazon Lex V2** and **AWS Lambda**.

The bot collects hotel booking details through a conversational flow and uses Lambda fulfillment logic to validate the information, calculate the booking price, and return a formatted confirmation.

## ✨ Features

- Conversational hotel-room booking
- City selection
- Room-type selection with descriptions
- Check-in date collection
- Number of nights
- Number of guests
- Booking confirmation
- Dynamic room pricing
- Room-specific descriptions
- Guest-based messages
- Formatted final booking summary
- Basic input validation
- Handles the common `duluxe` → `deluxe` spelling mistake

## 🛠️ Tech Stack

- **Amazon Lex V2** — conversational interface and slot collection
- **AWS Lambda** — serverless fulfillment logic
- **Node.js** — Lambda runtime
- **JavaScript / ES Modules**

## 🏗️ Architecture

```text
User
  ↓
Amazon Lex V2
  ↓
bookhotelroom Intent
  ↓
Collect required slots
  ├── CityName
  ├── roomType
  ├── CheckInDate
  ├── NoofNights
  └── NoofGuest
  ↓
Confirmation
  ↓
AWS Lambda Fulfillment
  ↓
Validate + calculate price + generate response
  ↓
Booking confirmation
```

## 📋 Amazon Lex Configuration

### Intent

`bookhotelroom`

### Sample utterances

```text
I want to book a hotel room
Book a room for me
I need a hotel for 2 nights
Reserve a hotel room
Can you help me book a room
Book a classic room for tomorrow
I need a room for 3 nights starting tomorrow
```

### Required slots

| Slot | Type | Purpose |
|---|---|---|
| `CityName` | `AMAZON.City` | Destination city |
| `CheckInDate` | `AMAZON.Date` | Check-in date |
| `roomType` | Custom `roomType` | Room category |
| `NoofNights` | `AMAZON.Number` | Length of stay |
| `NoofGuest` | `AMAZON.Number` | Number of guests |

### Room type values

```text
Classic
Deluxe
Duplex
Suite
```

The room-type prompt presents each option with a short description:

```text
Which type of room would you like?

1. Classic — Comfortable and affordable for a relaxing stay.
2. Deluxe — A spacious room with upgraded comfort.
3. Duplex — A two-level room ideal for families.
4. Suite — A premium room with extra space and comfort.

Please enter the room type.
```

## 💰 Room Pricing

| Room | Price / Night | Description |
|---|---:|---|
| Classic | ₹3,000 | Comfortable and affordable for a relaxing stay. |
| Deluxe | ₹4,500 | A spacious room with upgraded comfort. |
| Duplex | ₹6,000 | A two-level room ideal for families. |
| Suite | ₹8,000 | A premium room with extra space and comfort. |

Total price is calculated as:

```text
Total Price = Price Per Night × Number of Nights
```

## 💻 Lambda Fulfillment

The Lambda function:

1. Reads the slot values received from Amazon Lex.
2. Checks that all required values are present.
3. Converts the room type to lowercase for consistent pricing lookup.
4. Corrects the common `duluxe` spelling to `deluxe`.
5. Validates the number of nights and guests.
6. Selects the room price and description.
7. Calculates the total price.
8. Generates a guest-based message.
9. Returns a formatted booking confirmation.
10. Marks the Lex intent as `Fulfilled`.

## 🧪 Example Conversation

```text
User: I want to book a hotel room

Bot: Which city do you want to stay in?

User: mumbai

Bot: What is your check-in date?

User: 29-07-2025

Bot: Which type of room would you like?
     1. Classic — Comfortable and affordable for a relaxing stay.
     2. Deluxe — A spacious room with upgraded comfort.
     3. Duplex — A two-level room ideal for families.
     4. Suite — A premium room with extra space and comfort.

User: deluxe

Bot: How many nights will you stay?

User: 3

Bot: How many guests will be staying?

User: 2
```

The Lambda fulfillment returns a confirmation similar to:

```text
🏨 HOTEL BOOKING CONFIRMED

📍 City
mumbai

🛏️ Room
DELUXE
A spacious room with upgraded comfort.

📅 Check-in
2025-07-29

🌙 Stay
3 night(s)

👥 Guests
2

💰 Price per night
₹4500

💳 Total price
₹13500

💑 Perfect for a couple's stay!

🙏 Thank you for choosing our hotel!
```

## 📸 Screenshots

The `screenshots/` folder contains screenshots of the actual AWS project, including:

- Lambda function
- Lex sample utterances
- Lex slot configuration
- Room-type prompt
- Conversation flow
- Successful booking confirmation

## 📁 Project Structure

```text
hotel-booking-chatbot-aws/
├── lambda/
│   └── index.mjs
├── screenshots/
│   ├── 01-lambda-function.png
│   ├── 02-lex-slots.png
│   ├── 03-sample-utterances.png
│   ├── 04-booking-confirmation.png
│   ├── 05-room-type-prompt.png
│   └── 06-conversation-flow.png
├── .gitignore
├── README.md
└── lex-configuration.md
```

## 🚀 Deployment

### Amazon Lex V2

Create the bot and configure the `bookhotelroom` intent with the slots described above.

### AWS Lambda

Create a Lambda function using a Node.js runtime and use the code in:

```text
lambda/index.mjs
```

Connect the Lambda function to the Lex bot alias for fulfillment.

### Testing

Test the bot using the Amazon Lex test window. Provide the required booking information and verify that the Lambda fulfillment returns the final booking summary.

## ⚠️ Security

Do **not** commit:

- AWS access keys
- AWS secret keys
- Passwords
- API keys
- `.env` files containing credentials
- Other private credentials

This repository contains source code, configuration documentation, and screenshots only.

## 📌 Project Scope

This is an educational/demo hotel-booking chatbot. The current implementation performs conversational data collection, pricing calculation, and confirmation generation. It does **not** connect to real hotel inventory, payment processing, or an external booking database.

## 📄 License

This project is intended for educational and portfolio use.
