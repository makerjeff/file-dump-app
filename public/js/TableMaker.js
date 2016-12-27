/**
 * Created by jeffersonwu on 12/26/16.
 */
// tablemaker module

var TableMaker = {
    init: function() {
        //initialize here
    },

    refresh: function(data) {
        document.getElementById('tableList').innerHTML = '';
        data.forEach(function(elem, ind, arr){
            TableMaker.addLine(elem);
        });
    },
    addLine: function(dataObject) {

        // -- create table objects --
        var tr = document.createElement('tr');

        var filename_td = document.createElement('td');
        var size_td = document.createElement('td');
        var last_td = document.createElement('td');
        var operations = document.createElement('td');

        // fill table objects
        filename_td.innerHTML = dataObject.filename;
        size_td.innerHTML = dataObject.size;
        last_td.innerHTML = dataObject.last_modified;

        // -- create button objects --
        var downloadButtonHitbox = document.createElement('a');
        var downloadButton = document.createElement('button');
        var deleteButton = document.createElement('button');
        var downloadIcon = document.createElement('span');
        var deleteIcon = document.createElement('span');

        // fill button objects
        downloadButtonHitbox.href = '/download/' + dataObject.filename;
        downloadButtonHitbox.setAttribute('download', dataObject.filename); //just the file name, not the url.
        downloadButton.classList.add('btn', 'btn-default');
        downloadIcon.classList.add('fa', 'fa-download');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteIcon.classList.add('fa', 'fa-trash');

        // append button objects
        downloadButtonHitbox.appendChild(downloadButton);
        downloadButton.appendChild(downloadIcon);
        deleteButton.appendChild(deleteIcon);


        // append ALL table objects
        operations.appendChild(downloadButtonHitbox);
        operations.appendChild(deleteButton);

        tr.appendChild(filename_td);
        tr.appendChild(size_td);
        tr.appendChild(last_td);
        tr.appendChild(operations);
        tableList.appendChild(tr);

        // -- BUTTON EVENTS --
        //download button
        downloadButton.addEventListener('click', function(e){
            console.log('i am downloading ' + dataObject.filename);
        });
    }
};
