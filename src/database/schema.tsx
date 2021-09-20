import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'accounts',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'total', type: 'number' },
                { name: 'color', type: 'string' },
            ]
        }),
        tableSchema({
            name: 'goals',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'amount', type: 'number' },
                { name: 'account_id', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'networths',
            columns: [
                { name: 'date', type: 'string' },
                { name: 'amount', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'debits',
            columns: [
                { name: 'account_id', type: 'number' },
                { name: 'date', type: 'string' },
                { name: 'amount', type: 'string' },
            ]
        }),
        tableSchema({
            name: 'credits',
            columns: [
                { name: 'account_id', type: 'number' },
                { name: 'date', type: 'string' },
                { name: 'amount', type: 'string' },
            ]
        }),
    ]
});