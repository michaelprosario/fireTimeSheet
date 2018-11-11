

class ListTimeSheetComponent {
    constructor(objDataServices) {
        this.dataServices = objDataServices;
        this.listTimeSheets = function(){
            // do cool stuff
        }
        
    }
}

var dataServices = new FireStoreDataServices();
var listTimeSheetsComponent = new ListTimeSheetComponent(dataServices);

Vue.component('list-time-sheets', {
data: function () {

    return {

    }
},

  template: `

  <div id="divListTimeSheets">
  <h1>My Timesheets</h1>
  <button type="button" class="btn btn-primary">Add Time Sheet</button>
  <table class="table">
      <thead>
          <tr>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">&nbsp;</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td scope="row">10/29</td>
              <td>11/2</td>
              <td>&nbsp;</td>
          </tr>
          <tr>
              <td scope="row">11/5</td>
              <td>11/9</td>
              <td>&nbsp;</td>
          </tr>
      </tbody>
  </table>
  </div>

  `
})