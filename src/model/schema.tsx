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
                { name: 'account', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'networth',
            columns: [
                { name: 'date', type: 'string' },
                { name: 'amount', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'history',
            columns: [
                { name: 'date', type: 'string' },
                { name: 'account', type: 'number' },
                { name: 'type', type: 'string' },
            ]
        }),
    ]
});