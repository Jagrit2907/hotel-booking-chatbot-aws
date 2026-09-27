export const handler = async (event) => {
    try {
        console.log("Incoming event:", JSON.stringify(event, null, 2));

        const intent = event.sessionState?.intent;
        const slots = intent?.slots;

        console.log("Slot values received:", JSON.stringify(slots, null, 2));

        if (
            !slots ||
            !slots.CityName || !slots.CityName.value ||
            !slots.roomType || !slots.roomType.value ||
            !slots.CheckInDate || !slots.CheckInDate.value ||
            !slots.NoofNights || !slots.NoofNights.value ||
            !slots.NoofGuest || !slots.NoofGuest.value
        ) {
            return createErrorResponse(
                intent?.name || "Unknown",
                "Missing required information. Please provide all necessary details."
            );
        }

        const city = slots.CityName.value.interpretedValue;
        let roomType = slots.roomType.value.interpretedValue.toLowerCase();
        const checkInDate = slots.CheckInDate.value.interpretedValue;
        const noOfNights = parseInt(slots.NoofNights.value.interpretedValue);
        const numOfGuests = parseInt(slots.NoofGuest.value.interpretedValue);

        // Handle a common spelling mistake.
        if (roomType === "duluxe") {
            roomType = "deluxe";
        }

        if (
            isNaN(noOfNights) || noOfNights <= 0 ||
            isNaN(numOfGuests) || numOfGuests <= 0
        ) {
            return createErrorResponse(
                intent.name,
                "Invalid number of nights or guests. Please provide valid numbers."
            );
        }

        const roomPrices = {
            classic: 3000,
            deluxe: 4500,
            duplex: 6000,
            suite: 8000
        };

        const roomDescriptions = {
            classic: "Comfortable and affordable for a relaxing stay.",
            deluxe: "A spacious room with upgraded comfort.",
            duplex: "A two-level room ideal for families.",
            suite: "A premium room with extra space and comfort."
        };

        const pricePerNight = roomPrices[roomType] || roomPrices.classic;
        const description =
            roomDescriptions[roomType] || "A comfortable hotel room.";

        const totalPrice = pricePerNight * noOfNights;

        let guestMessage;

        if (numOfGuests === 1) {
            guestMessage = "✨ Perfect for a solo stay!";
        } else if (numOfGuests === 2) {
            guestMessage = "💑 Perfect for a couple's stay!";
        } else {
            guestMessage = "👨‍👩‍👧‍👦 Great choice for a group stay!";
        }

        const confirmationMessage =
            `🏨 HOTEL BOOKING CONFIRMED\n\n` +
            `📍 City\n` +
            `${city}\n\n` +
            `🛏️ Room\n` +
            `${roomType.toUpperCase()}\n` +
            `${description}\n\n` +
            `📅 Check-in\n` +
            `${checkInDate}\n\n` +
            `🌙 Stay\n` +
            `${noOfNights} night(s)\n\n` +
            `👥 Guests\n` +
            `${numOfGuests}\n\n` +
            `💰 Price per night\n` +
            `₹${pricePerNight}\n\n` +
            `💳 Total price\n` +
            `₹${totalPrice}\n\n` +
            `${guestMessage}\n\n` +
            `🙏 Thank you for choosing our hotel!`;

        return {
            sessionState: {
                dialogAction: { type: "Close" },
                intent: {
                    name: intent.name,
                    state: "Fulfilled"
                }
            },
            messages: [
                {
                    contentType: "PlainText",
                    content: confirmationMessage
                }
            ]
        };

    } catch (error) {
        console.error("Error processing request:", error);

        return createErrorResponse(
            "Unknown",
            "An error occurred while processing your request. Please try again later."
        );
    }
};

function createErrorResponse(intentName, message) {
    return {
        sessionState: {
            dialogAction: { type: "Close" },
            intent: {
                name: intentName,
                state: "Failed"
            }
        },
        messages: [
            {
                contentType: "PlainText",
                content: message
            }
        ]
    };
}
