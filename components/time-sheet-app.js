
function listTimeSheetsAddTimeSheet() {
    $("#divCreateTimeSheet").css('display', 'block');
}

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
        selectTimeEntry: function (recordId) {
            this.loadTimeEntry(recordId)
        },

        handleTimeEntrySaved: function () {
            fsDataServices.getTimeEntries().then(function (items) {

                timeEntryListData.splice(0, timeEntryListData.length)
                items.forEach((record) => {
                    timeEntryListData.push(record);
                });

            });
        },

        loadTimeEntry: function (recordId) {
            console.log("load time entry ... " + recordId);

            fsDataServices.getTimeEntry(recordId).then(function (record) {
                Object.assign(timeEntryData, record);
            });
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
        onclick="listTimeSheetsAddTimeSheet()">
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
            <a v-bind:href="timeSheet.id">Edit</a>           
            </td>
            <td>&nbsp;</td>
        </tr>        
    </tbody>
</table>

<div id="divListTimeEntries">
    <list-time-entries v-on:select-record="selectTimeEntry($event)" />
</div>


<div id="divCreateTimeEntry">
    <edit-time-entry v-on:record-saved="handleTimeEntrySaved()"/>
</div>

</div>

`
})