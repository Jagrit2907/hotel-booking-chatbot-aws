# Amazon Lex V2 Configuration

## Bot

- Bot name: `bookhotelBot`
- Language: English (US)

## Intent

`bookhotelroom`

## Sample Utterances

1. I want to book a hotel room
2. Book a room for me
3. I need a hotel for 2 nights
4. Reserve a hotel room
5. Can you help me book a room
6. Book a classic room for tomorrow
7. I need a room for 3 nights starting tomorrow

## Slots

| Slot | Type | Prompt |
|---|---|---|
| `CityName` | `AMAZON.City` | Which city do you want to stay in? |
| `CheckInDate` | `AMAZON.Date` | What is your check-in date? |
| `roomType` | Custom `roomType` | Which type of room would you like? |
| `NoofNights` | `AMAZON.Number` | How many nights will you stay? |
| `NoofGuest` | `AMAZON.Number` | How many guests will be staying? |

All five slots are required for the booking flow.

## Custom Slot Type

`roomType`

Values:

- Classic
- Deluxe
- Duplex
- Suite

## Room-Type Prompt

```text
Which type of room would you like?

1. Classic — Comfortable and affordable for a relaxing stay.
2. Deluxe — A spacious room with upgraded comfort.
3. Duplex — A two-level room ideal for families.
4. Suite — A premium room with extra space and comfort.

Please enter the room type.
```

## Confirmation

The bot confirms the collected booking details before fulfillment.

## Fulfillment

AWS Lambda function:

`bookhotellambda`

Lambda runtime code is stored in:

`lambda/index.mjs`

The Lambda is used for fulfillment only.
