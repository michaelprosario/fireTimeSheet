
Vue.component('time-sheet-app', {

    created: function () {
        console.log(this.timeSheets);
    },
    data: function () {
        return {
            timeSheets: timeSheetData
        }
    },

    methods: {
        selectRecord: function (recordId) {
            console.log("Load time sheet: " + recordId);
            currentTimeSheetId = recordId;
            this.loadTimeEntryList();  
        },

        loadTimeEntryList: function() {
            $("#divListTimeEntries").css('display', 'block');
            fsDataServices.getTimeEntries(currentTimeSheetId).then(function (items) {
                timeEntryListData.splice(0, timeEntryListData.length)
                items.forEach((record) => {
                    timeEntryListData.push(record);
                });

            });
        },

        handleTimeEntrySaved: function () {
            this.loadTimeEntryList();
        },

        listTimeSheetsAddTimeSheet: function() {
            $("#divCreateTimeSheet").css('display', 'block');
        },        

        selectTimeEntry: function (recordId) {
            $("#divCreateTimeEntry").css('display', 'block');

            fsDataServices.getTimeEntry(recordId).then(function (record) {
                Object.assign(timeEntryData, record);
            });
        },

        deleteTimeEntry: function (recordId) {
            this.loadTimeEntryList();
        }        

    },

    template: `
<div>

<div id="divCreateTimeSheet" style="display:none">
    <create-time-sheet/>
</div>

<h1>My Timesheets</h1>

<button type="button" 
        class="btn btn-primary" 
        v-on:click="listTimeSheetsAddTimeSheet()"
        >
        Add Time Sheet
</button>

<table class="table table-hover">
    <thead>
        <tr>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col"></th>
            <th scope="col">&nbsp;</th>
        </tr>
    </thead>
    <tbody v-for="timeSheet in timeSheets">
        <tr>
            <td scope="row">{{timeSheet.startDate}}</td>
            <td>{{timeSheet.endDate}}</td>
            <td>
            <button @click="selectRecord(timeSheet.id)" >
            Edit
            </button>
            </td>
            <td>&nbsp;</td>
        </tr>        
    </tbody>
</table>

<div id="divCreateTimeEntry" style="display:none">
    <hr>
    <edit-time-entry v-on:record-saved="handleTimeEntrySaved()"/>
    <hr>
</div>

<div id="divListTimeEntries"  style="display:none">
    <list-time-entries 
        v-on:select-record="selectTimeEntry($event)"
        v-on:delete-record="deleteTimeEntry($event)" 
        />
</div>


</div>

`
})