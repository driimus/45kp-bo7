// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { StatePropertyAccessor, TurnContext, UserState } from 'botbuilder';
import {
    ChoiceFactory,
    ChoicePrompt,
    ComponentDialog,
    ConfirmPrompt,
    DialogSet,
    DialogTurnStatus,
    PromptValidatorContext,
    TextPrompt,
    WaterfallDialog,
    WaterfallStepContext
} from 'botbuilder-dialogs';
import * as Texts from '../texts';
import { UserProfile } from '../userProfile';

const CHOICE_PROMPT = 'CHOICE_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
const NAME_PROMPT = 'NAME_PROMPT';
const USER_PROFILE = 'USER_PROFILE';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

const fruitChoices = {
    Apples: ['Gala', 'Fuji', 'Braeburn'],
    Pears: ['Forelle', 'Bosc', 'Bartlett']
};

export class UserProfileDialog extends ComponentDialog {
    private userProfile: StatePropertyAccessor<UserProfile>;

    constructor(userState: UserState) {
        super('userProfileDialog');

        this.userProfile = userState.createProperty(USER_PROFILE);

        this.addDialog(new TextPrompt(NAME_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));

        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.nameStep.bind(this),
            this.fruitChoiceStep.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    /**
     * The run method handles the incoming activity (in the form of a TurnContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} turnContext
     * @param {*} accessor
     */
    public async run(turnContext: TurnContext, accessor: StatePropertyAccessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }

    private async nameStep(stepContext: WaterfallStepContext) {
        return await stepContext.prompt(NAME_PROMPT, Texts.NamePromptText);
    }

    private async fruitChoiceStep(stepContext: WaterfallStepContext<UserProfile>) {
        const userProfile = await this.userProfile.get(stepContext.context, new UserProfile());
        userProfile.name = stepContext.result;

        return await stepContext.prompt(CHOICE_PROMPT, {
            choices: ChoiceFactory.toChoices(Object.keys(fruitChoices)),
            prompt: Texts.fruitChoiceText(userProfile.name)
        });
    }
        // // Finish with the end of the Waterfall dialog.
        // return await stepContext.endDialog();
}
