
/*
x - default date to today
x- enter start time
x- enter end time
x- calculate hours
- make sure project is required
- make sure story is required
- make sure task is required
- provide a way to add notes

*/

class CreateTimeEntryComponent {
    constructor(objDataServices) {
        this.fsDataServices = objDataServices;
    }

    save(){

        /*
        let timeEntryRecord = {
            
        };
        

        fsDataServices.saveTimeEntry(timeEntryRecord).then(function(){
            $("#divCreateTimeSheet").css('display','none');
            
            fsDataServices.getTimeSheets().then(function(items){
                timeSheetData.splice(0,timeSheetData.length)
                items.forEach((timeSheet) => {
                    timeSheetData.push(timeSheet);
                });
            });
        });

        */
    }
}

var fsDataServices = new FireStoreDataServices();
var createTimeEntryComponent = new CreateTimeEntryComponent(fsDataServices);

Vue.component('create-time-entry', {
data: function () {
    var dateToday = new Date();
    dateToday = getShortDateFormat(dateToday);

    return {
        dateForToday: dateToday,
        startTime: '',
        endTime: '',
        hours: '',
        project: '',
        story: '',
        task: '',
        date: ''
    }
},

methods: 
{
    handleSave: function(){
        createTimeEntryComponent.save();
    },

    handleOnBlurTime: function(){
        if(isValidTime(this.startTime) && isValidTime(this.endTime)){
            // adapted from here: http://jsfiddle.net/VnwF7/4/
            var objTimeStart = new Date("01/01/2007 " + this.startTime);
            var objTimeEnd = new Date("01/01/2007 " + this.endTime);
            var deltaHours = objTimeEnd.getHours() - objTimeStart.getHours();
            var deltaMinutes = objTimeEnd.getMinutes() - objTimeStart.getMinutes();
            this.hours = deltaHours + (deltaMinutes/60);
        }
    },

    getFormErrors: function() {
        var errors = [];

        if(this.project ===""){
            errors.push("Project is required.")
        }


        return errors;
    },

    handleCreateTimeEntry: function(){
        console.log("handleCreateTimeEntry")
        var errors = this.getFormErrors();

        if(errors.length === 0){
            console.log("save stuff");
        }
    }

},


template: `
<div>

<h1>Create Time Entry</h1>
<div class="control-group">
    <label for="date" class="control-label">
        Date
    </label>
    <div class="controls">
        <input  name="txtDate" 
                type="text"  
                id="txtDate"
                v-model:value="date"
                >
    </div>
</div>
<div class="control-group">
    <label for="start" class="control-label">
        Start
    </label>
    <div class="controls">
        <input  name="txtStart" 
                type="text" 
                v-model:value="startTime" 
                id="txtStart"
                v-on:blur="handleOnBlurTime()"
                >
    </div>
</div>
<div class="control-group">
    <label for="start" class="control-label">
        End
    </label>
    <div class="controls">
        <input  name="txtEnd" 
                type="text" 
                v-model:value="endTime" 
                id="txtEnd" 
                v-on:blur="handleOnBlurTime()">
    </div>
</div>
<div class="control-group">
    <label for="hours" class="control-label">
        Hours
    </label>
    <div class="controls">
        <input  name="txtHours" 
                type="text" 
                id="txtHours" 
                v-model:value="hours">
    </div>
</div>
<div class="control-group">
    <label for="story" class="control-label">
        Project
    </label>
    <div class="controls">
        <input  name="txtProject" 
                type="text" 
                id="txtProject"
                v-model:value="project"
                >
    </div>
</div>
<div class="control-group">
    <label for="story" class="control-label">
        Story
    </label>
    <div class="controls">
        <input  name="txtStory" 
                type="text" 
                id="txtStory"
                v-model:value="story"
                >
    </div>
</div>
<div class="control-group">
    <label for="task" class="control-label">
        Task
    </label>
    <div class="controls">
        <input  name="txtTask" 
                type="text"id="txtTask"
                v-model:value="task"
                >
    </div>
</div>


<br>
<div class="form-actions">
    <button 
        type="button" 
        class="btn btn-large btn-primary"
        v-on:click="handleCreateTimeEntry"
        >
        Save
    </button>
</div>

</div>
`
})