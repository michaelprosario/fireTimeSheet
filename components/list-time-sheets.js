
function listTimeSheetsAddTimeSheet()
{
    $("#divCreateTimeSheet").css('display','block');
}

Vue.component('list-time-sheets', {
    
created: function(){
    console.log(this.timeSheets);
},
data: function(){
    return {
        timeSheets: timeSheetData
    }
},

methods:{
    selectTimeEntry: function(recordId) {
        this.loadTimeEntry(recordId)
    },
    
    loadTimeEntry: function(recordId){
        console.log("load time entry ... " + recordId);
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

<table class="table">
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
    <create-time-entry />
</div>

</div>

`
})