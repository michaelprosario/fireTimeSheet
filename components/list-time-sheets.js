
function listTimeSheetsAddTimeSheet()
{
    $("#divCreateTimeSheet").css('display','block');
    
}


Vue.component('list-time-sheets', {
    data() {
        return {
            timeSheets: []
        }
    },
    created: function () {
        var listTimeSheets = this;
        var fsDataServices = new FireStoreDataServices();
        fsDataServices.getTimeSheets().then(function(items) {
            listTimeSheets.timeSheets = items;
        });
    },
    template: 
    `

  <div>
  <h1>My Timesheets</h1>
  <button type="button" class="btn btn-primary" onclick="listTimeSheetsAddTimeSheet()">Add Time Sheet</button>
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
  </div>

  `
})