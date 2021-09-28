import database from "database/index";
import Goal from "models/Goal";

const goalsCollection = database.get('goals');

type GoalData = {
    name: string,
    amount: number,
    accountId: string
}

export const getTotalCompletion = async () => {
    const goals = await goalsCollection.query().fetch();
    const totalGoals = goals.reduce((prev, goal: Goal) => prev + goal.amount, 0);
    const totalAccounts = await goals.reduce(async (prev, goal: Goal) => {
        const account = await goal.account;
        const prevVal = await prev;

        return prevVal + (account.total > goal.amount ? goal.amount : account.total);
    }, Promise.resolve(0));

    return (totalAccounts / totalGoals) * 100;
}

export const add = async ({ name, amount, accountId }: GoalData) => {
    await database.write(async () => {
        await goalsCollection.create((goal: Goal) => {
            goal.name = name;
            goal.amount = amount;
            goal.account.id = accountId;
        });
    });
}