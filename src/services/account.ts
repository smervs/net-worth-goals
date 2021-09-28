import database from "database/index";
import Account from "models/Account";

const accountsCollection = database.get('accounts');

type AccountData = {
    name: string,
    total: number,
    color: string
}

export const findAll = async () => {
    const accounts = await accountsCollection.query().fetch();
    return accounts;
}

export const getNetworth = async () => {
    const accounts = await accountsCollection.query().fetch();
    const networth = accounts.reduce((prev, account: Account) => prev + account.total, 0);
    return networth;
}

export const add = async ({ name, total, color }: AccountData) => {
    await database.write(async () => {
        await accountsCollection.create((account: Account) => {
            account.name = name,
            account.total = total,
            account.color = color
        });
    });
}