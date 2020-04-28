const welcomeText = (botName: string) =>
    `Hi there! I'm ${botName}. Nice to meet you`;
const NamePromptText = `Let's start by getting acquainted. Who am I talking to?`;
const fruitChoiceText = (recipientName: string) =>
    `Alright, ${recipientName}. What do you prefer: apples or pears?`;
const argumentPromptText = (fruit: string) =>
    `Interesting pick... so what is it that makes ${fruit} stand out to you?`;
const fruitTypeChoiceText = (fruit: string) =>
    `Got it! What type of ${fruit} is your favourite?`;
const typeArgumentPromptText = (fruitType: string, fruit: string) =>
    `Nice! Why is the ${fruitType} ${fruit} so special?`;
const farewellText = (botName: string, recipientName: string) =>
    `Understood. Well, ${recipientName}, it's been a pleasure. ${botName} signing off, take care!`;

export {
    welcomeText,
    NamePromptText,
    fruitChoiceText,
    fruitTypeChoiceText,
    argumentPromptText,
    typeArgumentPromptText,
    farewellText
};
