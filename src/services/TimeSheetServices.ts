import { TimeSheet } from '@/services/TimeSheet';

export interface ITimeSheetDataStore   {
    addTimeSheet(timeSheet: TimeSheet): void;
}

export interface ISession {
    getCurrentUser(): string;
}

export class TimeSheetServices {
    public constructor(private dataStore: ITimeSheetDataStore, private sessionData: ISession) {
        // blank
    }

    public addTimeSheet(firstDayOfWeek: Date): void {
        const endOfWeekDate = new Date(
            firstDayOfWeek.getFullYear(),
            firstDayOfWeek.getMonth(),
            firstDayOfWeek.getDate() + 4);

        const now = new Date();
        const currentUser = this.sessionData.getCurrentUser();

        const record: TimeSheet = {
            startDate: firstDayOfWeek,
            endDate: endOfWeekDate,
            createdAt: now,
            updatedAt: now,
            createdBy: currentUser,
            updatedBy: currentUser,
        };

        this.dataStore.addTimeSheet(record);
    }
}