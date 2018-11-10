import { TimeSheet } from '@/services/TimeSheet';
import { TimeSheetServices } from '@/services/TimeSheetServices';
import { ISession } from '@/services/TimeSheetServices';
import { ITimeSheetDataStore } from '@/services/TimeSheetServices';

class FakeSession implements ISession{
  public getCurrentUser(): string {
    return 'mrosario';
  }
}

// tslint:disable-next-line:max-classes-per-file
class FakeDataStore implements ITimeSheetDataStore{
  public addMethodCalled: boolean = false;
  public timeSheet!: TimeSheet;
  public addTimeSheet(timeSheet: TimeSheet): void {
   this.addMethodCalled = true;
   this.timeSheet = timeSheet;
  }
}

describe('TimeSheetServices', () => {
  it('adds time sheet to database', () => {
    // arrange
    const session = new FakeSession();
    const dataStore = new FakeDataStore();
    const date = new Date(2018, 11, 5);

    const timeSheetServices = new TimeSheetServices(dataStore, session)

    // act
    timeSheetServices.addTimeSheet(date);

    // assert
    const timeSheet: TimeSheet = dataStore.timeSheet;
    expect(dataStore.addMethodCalled).toBeTruthy();
    expect(timeSheet.endDate.getDate()).toEqual(9);
  });
});
