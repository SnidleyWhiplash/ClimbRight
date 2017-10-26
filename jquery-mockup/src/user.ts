import * as $ from 'jquery';

import { TrackerEntry } from './tracker-entry';

export class User {
    username: string;
    password: string;
    email: string;
    myFitnessLog: TrackerLog;
}

export class TrackerLog {
    myLog: TrackerEntry[] = [];
}