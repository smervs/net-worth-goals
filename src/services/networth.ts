import database from "database/index";
import { Q } from '@nozbe/watermelondb';
import Account from "models/Account";
import dayjs from "dayjs";
import Networth from "models/Networth";

const accountsCollection = database.get('accounts');
const networthsCollection = database.get('networths');

const addNetworth = async (totalNetworth) => {
    await database.write(async () => {
        await networthsCollection.create((networth: Networth) => {
            networth.date = dayjs().format('YYYYMMDD'),
                networth.amount = totalNetworth
        });
    });
}

const updateNetworth = async (networthModel, totalNetworth) => {
    await database.write(async () => {
        await networthModel.update((networth: Networth) => {
            networth.amount = totalNetworth;
        });
    });
}

export const sync = async () => {
    const accounts = await accountsCollection.query().fetch();
    const totalNetworth = accounts.reduce((prev, acc: Account) => prev + acc.total, 0);

    const list = await networthsCollection.query(
        Q.where('date', dayjs().format('YYYYMMDD'))
    ).fetch();

    if (list && list.length) {
        await updateNetworth(list[0], totalNetworth);
    } else {
        await addNetworth(totalNetworth);
    }
}

export const getNetworthGraph = async () => {
    const networths = await networthsCollection.query().fetch();
    const data = networths.map((net: Networth) => (
        { x: dayjs(net.date).format('YYYY-MM-DD'), y: net.amount }
    ));

    return data
}