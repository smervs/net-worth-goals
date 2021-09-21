import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Networth extends Model {
    static table = 'networths';

    @field('date') date;
    @field('amount') amount;
}