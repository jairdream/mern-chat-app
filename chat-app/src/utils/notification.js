export const startNotification = (message) => {
  const notification = new Notification(message.sender.name, {
    body: message.content,
    icon: "./logo.png",
  });
  notification.onclick = () => {
    window.focus();
  };
};
