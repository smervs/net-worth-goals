import { Model } from '@nozbe/watermelondb';
import { field, text } from '@nozbe/watermelondb/decorators';

export default class Account extends Model {
    static table = 'accounts';

    @text('name') name;
    @field('total') total;
    @field('color') color;
}