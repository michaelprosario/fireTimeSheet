

Vue.component('edit-time-entry', {
    data: function () {
        var dateToday = new Date();
        dateToday = getShortDateFormat(dateToday);
        timeEntryData.date = dateToday;
        console.log(timeEntryData);
        return timeEntryData;
    },

    methods:
        {
            handleOnBlurTime: function () {
                if (isValidTime(this.startTime) && isValidTime(this.endTime)) {
                    // adapted from here: http://jsfiddle.net/VnwF7/4/
                    var objTimeStart = new Date("01/01/2007 " + this.startTime);
                    var objTimeEnd = new Date("01/01/2007 " + this.endTime);
                    var deltaHours = objTimeEnd.getHours() - objTimeStart.getHours();
                    var deltaMinutes = objTimeEnd.getMinutes() - objTimeStart.getMinutes();
                    this.hours = deltaHours + (deltaMinutes / 60);
                }
            },

            getFormErrors: function () {
                this.errors = [];
                console.log(this);

                if (this.project === "") {
                    this.errors.push("Project is required.")
                }

                if (this.story === "") {
                    this.errors.push("Story is required.")
                }

                if (!isValidTime(this.startTime)) {
                    this.errors.push('Valid start time is required');
                }

                if (!isValidTime(this.endTime)) {
                    this.errors.push('Valid end time is required');
                }

                if (isNaN(Date.parse(this.date))) {
                    this.errors.push("Please provide a valid date")
                }

                // hours should be a float
                if (isNaN(parseFloat(this.hours))) {
                    this.errors.push("Enter a valid number for the hours");
                }

                return this.errors;
            },

            handleCreateTimeEntry: function () {
                console.log("handleCreateTimeEntry")
                var errors = this.getFormErrors();

                if (errors.length === 0) {
                    var fsDataServices = new FireStoreDataServices();
                    let timeEntryRecord = {
                        startTime: this.startTime,
                        endTime: this.endTime,
                        hours: this.hours,
                        project: this.project,
                        story: this.story,
                        task: this.task,
                        date: this.date,
                        notes: this.notes,
                        timeSheetId: currentTimeSheetId,
                        id: this.id
                    }

                    var vm = this;
                    if (this.id === null || this.id === '') {
                        fsDataServices.addTimeEntry(timeEntryRecord).then(function () {
                            vm.$emit('record-saved');
                            $("#divCreateTimeEntry").css('display', 'none');
                        });
                    } else {
                        fsDataServices.updateTimeEntry(timeEntryRecord).then(function () {
                            vm.$emit('record-saved');
                            $("#divCreateTimeEntry").css('display', 'none');
                        });
                    }

                } else {
                    console.log(errors);
                }
            },

            handleCancelTimeEntry: function(){
                $("#divCreateTimeEntry").css('display', 'none');
            }
                 
        },


    template: `
<div>

<div class="container">
<h1>Create Time Entry</h1>

<div>
    <ul v-for="error in errors">
        <li style="color:red">{{error}}</li>
    </ul>
</div>

</div>
<div class="container">
<input  name="hidTimeEntryId" 
            type="text" 
            v-model:value="id" 
            id="hidTimeEntryId"
            style="display:none"
            >
<div class="row">
    <div class="col">
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
    <div class="col">
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
</div> <!-- end row -->
        
<div class="row">
    <div class="col">
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
    <div class="col">
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
</div><!-- end row -->

<div class="row">
    <div class="col">
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
    <div class="col">
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
</div> <!-- end row -->

<div class="row">
    <div class="col">
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
    <div class="col">
        <label for="task" class="control-label">
            Notes
        </label>
        <div class="controls">
            <textarea   name="txtNotes" 
                        type="text"
                        id="txtNotes"
                        v-model:value="notes"
                        >
            </textarea>
        </div>
    </div>
    
</div><!-- end row -->
<div class="row">
    <div class="col">
        <button 
            type="button" 
            class="btn btn-large btn-primary"
            v-on:click="handleCreateTimeEntry"
            >
            Save
        </button>

        <button 
            type="button" 
            class="btn btn-large btn-primary"
            v-on:click="handleCancelTimeEntry"
            >
            Cancel
        </button>

    </div><!-- end col -->

</div><!-- end row -->            


</div><!-- end container -->

<br>

</div><!-- end root div -->
`
})