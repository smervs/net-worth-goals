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
    const now = dayjs();
    const networths = await networthsCollection.query(
        Q.unsafeSqlQuery(
            `select * from networths
            where date <= '${now.format('YYYYMMDD')}'
            and date >= '${now.subtract(1, 'year').format('YYYYMMDD')}'
            order by date asc`
        )
    ).fetch();

    let networthMap = new Map();
    Array.from(networths).forEach((networth: Networth) => {
        const index = dayjs(networth.date).format('YYYYMM');
        if (networthMap.has(index)) {
            const selected = networthMap.get(index);
            if (selected.date < networth.date) {
                networthMap.set(index, networth);
            }
        } else {
            networthMap.set(index, networth);
        }
    });

    const list = Array.from(networthMap.values()).map((networth: Networth) => ({
        x: dayjs(networth.date).format('MMM YYYY'),
        y: networth.amount
    }));

    return list;
}