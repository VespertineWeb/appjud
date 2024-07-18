import sendpulse from 'sendpulse-api';

const SENDPULSE_USER_ID = process.env.SENDPULSE_USER_ID;
const SENDPULSE_SECRET = process.env.SENDPULSE_SECRET;

let tokenStorage = '';

const tokenStorageFunc = {
  save_token: (data) => {
    tokenStorage = data;
  },
  get_token: () => {
    return tokenStorage;
  }
};

sendpulse.init(SENDPULSE_USER_ID, SENDPULSE_SECRET, tokenStorageFunc, () => {
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
