import sendpulse from 'sendpulse-api';

sendpulse.init(process.env.SENDPULSE_USER_ID, process.env.SENDPULSE_SECRET, process.env.SENDPULSE_TOKEN_STORAGE, (token) => {
  console.log('SendPulse initialized');
});

export const sendWhatsAppNotification = (phone, message) => {
  const data = {
    "phone": phone,
    "message": message,
    "sender": "YourSenderID",
  };

  sendpulse.whatsappSendMessage(data, (response) => {
    console.log(response);
  });
};
