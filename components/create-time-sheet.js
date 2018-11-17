

class CreateTimeSheetComponent {
    constructor(objDataServices, timeSheetCreatedCallback) {
        this.dataServices = objDataServices;
        this.save = function () {
            const strStartDate = $("#txtStartDate").val();
            const objStartDate = new Date(strStartDate);
            const objEndDate = new Date(objStartDate.getFullYear(), objStartDate.getMonth(), objStartDate.getDate() + 4);
            const strEndDate = getShortDateFormat(objEndDate);
            let timeSheetRecord = {
                startDate: strStartDate,
                endDate: strEndDate,
            };

            var createTimeSheetComponent = this;

            dataServices.saveTimeSheet(timeSheetRecord).then(function(){
                console.log("how do we reload the list?");
                $("#divCreateTimeSheet").css('display','none');
                timeSheetCreatedCallback();
            });

        };

    }
}

function handleTimeSheetCreated(){
    console.log('handleTimeSheetCreated');
    var dataServices = new FireStoreDataServices();
    dataServices.getTimeSheets().then(function(items){
        window.location = window.location.href
    });
}

var dataServices = new FireStoreDataServices();
var createTimeSheetComponent = new CreateTimeSheetComponent(dataServices, handleTimeSheetCreated);

Vue.component('create-time-sheet', {
data: function () {
    // https://stackoverflow.com/questions/33078406/getting-the-date-of-next-monday
    // find next monday
    var d = new Date();
    d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7);
    const nextMonday = getShortDateFormat(d);

    return {
    defaultDate: nextMonday,
    handleSave: createTimeSheetComponent.save
    }
},

  template: `
<div>
  <h1>Create Time Sheet</h1>
  <div class="control-group">
      <label for="email" class="control-label">
          Start Date(Monday)
      </label>
      <div class="controls">
          <input name="txtStartDate" type="text" :value="defaultDate" id="txtStartDate">
      </div>
  </div>
  <br>
  <div class="form-actions">
      <button type="button" class="btn btn-large btn-primary" v-on:click="handleSave()">
          Save
      </button>
  </div>
</div>   
  `
})