import { Model } from '@nozbe/watermelondb';
import { field, text } from '@nozbe/watermelondb/decorators';

export default class Goal extends Model {
    static table = 'goals';

    @text('name') name;
    @field('amount') amount;
}