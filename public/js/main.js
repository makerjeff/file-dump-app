/**
 * Created by jeffersonwu on 12/26/16.
 */

//TODO: replace with AJAX data.
var dataFromServer = [
    {filename: 'first_file.mp4', size: 2333234, last_modified: 1482743983442},
    {filename: 'second_file.mp4', size: 2333234, last_modified: 1482743983445},
    {filename: 'third_file.mp4', size: 2333234, last_modified: 1482743983456},
    {filename: 'fourth_file.mp4', size: 2333234, last_modified: 1482743983465},
    {filename: 'fifth_file.mp4', size: 2333234, last_modified: 1482743983465},
    {filename: 'sixth_file.mp4', size: 2333234, last_modified: 1482743983465},
    {filename: 'seventh_file.mp4', size: 2333234, last_modified: 1482743983465},
    {filename: 'eight_file.doc', size: 2333234, last_modified: 1482743983465},
    {filename: 'ninth_file.pdf', size: 2333234, last_modified: 1482743983465}
];

var dummyFilteredData = [
    {filename: 'filtered_file_array_data.mp4', size: 123456, last_modified: 12321412414}
];

var searchBox = document.getElementById('searchBox');
var resultDiv = document.getElementById('resultDiv');
var tableList = document.getElementById('tableList');

// draw table items
TableMaker.refresh(dataFromServer);




// TODO - MAKE THIS ON A half second TIMER that resets after a key is pressed

searchBox.addEventListener('keyup', function(e){
    console.log(e.keyCode + ', "' + this.value + '"');

    // if key is escape
    if(e.keyCode == 27) {
        this.value = '';
    }

    else if(this.value !== '' && this.value !== undefined) {
        TableMaker.refresh(filtrator(this.value, dataFromServer));
    }

    else {
        //TODO: if box is empty, return original array
        TableMaker.refresh(dataFromServer);
    }


});


function filtrator(inputStr, dataArray) {
    var returnArr = [];
    var searchText = new RegExp(inputStr, 'g'); //creates RegExpression out of text input
    //console.log(searchText);

    dataArray.forEach(function(elem, ind, arr){
        // check to see if string is in file name, if so push to array
        if (elem.filename.search(new RegExp(searchText, 'g')) !== -1) {
            returnArr.push(elem);
        }
    });



    console.log(returnArr);
    return returnArr;



}


