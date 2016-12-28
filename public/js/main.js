/**
 * Created by jeffersonwu on 12/26/16.
 */

var globalDataFromServer = [];
window.addEventListener('load', function(e){

    //TODO: get files on load.
    console.log('page fully loaded.');
    getFileListData().then(function(val){}).catch(function(reason){});

    // -- temporary load button --
    var loadButton = document.getElementById('tempButton');

    // grab info,
    loadButton.addEventListener('click', function(e){
        getFileListData().then(function(val){
            globalDataFromServer = val;
            TableMaker.refresh(val);
        }).catch(function(reason){
            console.log('Caught failure, Error: ' + reason);
        });
    });
    // -- temporary load button - end --

});

window.addEventListener('DOMContentLoaded', function(e){
    console.log('DOM loaded.');
});

var searchBox = document.getElementById('searchBox');
var resultDiv = document.getElementById('resultDiv');
var tableList = document.getElementById('tableList');


// TODO - MAKE THIS ON A QUARTER SECOND TIMER that resets after a key is pressed,
// TODO - Modularize.

searchBox.addEventListener('keyup', function(e){
    console.log(e.keyCode + ', "' + this.value + '"');

    // if key is escape
    if(e.keyCode == 27) {
        this.value = '';
    }

    else if(this.value !== '' && this.value !== undefined) {
        TableMaker.refresh(filtrator(this.value, globalDataFromServer));
    }

    else {
        //TODO: if box is empty, return original array
        TableMaker.refresh(globalDataFromServer);
    }

});

/**
 * Dynamic data filtrator.
 * @param inputStr  Input string to search for (grabs text field).
 * @param dataArray array of data to compare to.
 * @returns {Array}
 */
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

/**
 * Get file list from server.
 * @returns {Promise}
 */
function getFileListData(){
    return new Promise(function(resolve, reject){
        $.ajax({
            url: '/fileList',
            method: 'GET',
            success: function(data, status, jqXHR) {
                console.log('Successfully grabbed data via AJAX. ');
                resolve(data);
            },
            error: function(jqXHR, status, err){
                console.log('Error. ' + err);
                reject('no data available.');
            }
        });
    });

}


