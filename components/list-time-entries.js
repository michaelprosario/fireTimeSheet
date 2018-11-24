Vue.component('list-time-entries', {

    data: function () {

        return {
            timeEntries: timeEntryListData
        }
    },

    methods: {
        selectRecord: function (objRow) {
            this.$emit('select-record', objRow.id)
        },

        handleAddTimeEntry: function(){
            $("#divCreateTimeEntry").css('display', 'block');
        },
    },

    template: `
<div>

    <h1>Time Entry List</h1>
    <button type="button" class="btn btn-primary" v-on:click="handleAddTimeEntry">Add Time Entry</button>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Date</th>
                <th scope="col">Start</th>
                <th scope="col">End</th>
                <th scope="col">Project</th>
                <th scope="col">Story</th>
                <th scope="col">Task</th>
                <th scope="col">Hours</th>
                <th>&nbsp;</th>
            </tr>
        </thead>
        <tbody v-for="timeEntry in timeEntries">
            <tr>
                <td scope="col">{{timeEntry.date}}</td>
                <td scope="col">{{timeEntry.startTime}}</td>
                <td scope="col">{{timeEntry.endTime}}</td>
                <td scope="col">{{timeEntry.project}}</td>
                <td scope="col">{{timeEntry.story}}</td>
                <td scope="col">{{timeEntry.task}}</td>
                <td scope="col">{{timeEntry.hours}}</td> 
                <td>
                    <button @click="selectRecord(timeEntry)" >
                    Edit
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
`
})
