import { Model } from '@nozbe/watermelondb';
import { field, text, relation } from '@nozbe/watermelondb/decorators';

export default class Goal extends Model {
    static table = 'goals';

    @text('name') name;
    @field('amount') amount;
    @relation('accounts', 'account_id') account;
}