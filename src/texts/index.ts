const welcomeText = (botName: string) =>
    `Hi there! I'm ${botName}. Nice to meet you`;
const NamePromptText = `Let's start by getting acquainted. Who am I talking to?`;
const nameConfirmText = (recipientName: string) =>
    `Understood. Just to confirm, your name is ${recipientName}. Is that correct?`;
const fruitChoiceText = (recipientName: string) =>
    `Alright, ${recipientName}. What do you prefer: apples or pears?`;
const RetryConfirmText = `You must answer with Yes/No.'`;
export {
    welcomeText,
    NamePromptText,
    nameConfirmText,
    fruitChoiceText,
    RetryConfirmText
};
