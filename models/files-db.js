/**
 * Created by jeffersonwu on 12/26/16.
 */

const fs = require('fs');

var dataFromServer = [
    {filename: 'first_file.mp4', size: 2333234, last_modified: 1482743983442},
    {filename: 'second_file.mp4', size: 2333234, last_modified: 1482743983445},
    {filename: 'third_file.mp4', size: 2333234, last_modified: 1482743983456},
    {filename: 'fourth_file.mp4', size: 2333234, last_modified: 1482743983465},
    {filename: 'fifth_file.mp4', size: 2333234, last_modified: 1482743983465},
    {filename: 'sixth_file.mp4', size: 2333234, last_modified: 1482743983465},
    {filename: 'seventh_file.mp4', size: 2333234, last_modified: 1482743983465},
    {filename: 'eight_file.doc', size: 2333234, last_modified: 1482743983465},
    {filename: 'tenth.pdf', size: 2333234, last_modified: 1482743983465},
    {filename: 'elev_file.psd', size: 2333234, last_modified: 1482743983465},
    {filename: 'nincompoop.psd', size: 2333234, last_modified: 1482743983465},
    {filename: 'ninth_file.png', size: 2333234, last_modified: 1482743983465},
    {filename: 'first_faker.mp3', size: 2333234, last_modified: 1482743983442},
    {filename: 'second_music.mp3', size: 2333234, last_modified: 1482743983445},
    {filename: 'third_file.mp3', size: 2333234, last_modified: 1482743983456},
    {filename: 'fourth_video.m4v', size: 2333234, last_modified: 1482743983465},
    {filename: 'fifth_file.mp3', size: 2333234, last_modified: 1482743983465},
    {filename: 'sixth_file.mp4', size: 2333234, last_modified: 1482743983465},
    {filename: 'seventh_file.mp4', size: 2333234, last_modified: 1482743983465},
    {filename: 'eight_file.xls', size: 2333234, last_modified: 1482743983465},
    {filename: 'tenth.pdf', size: 2333234, last_modified: 1482743983465},
    {filename: 'elev_file.psd', size: 2333234, last_modified: 1482743983465},
    {filename: 'nincompoop.jpg', size: 2333234, last_modified: 1482743983465},
    {filename: 'ninth_file.jpg', size: 2333234, last_modified: 1482743983465},
    {filename: 'bg_music.mp3', size: 477203, last_modified: 1482743983465},
    {filename: 'unnamed.png', size: 20000, last_modified: 1234523525}
];

/**
 * Get the file list.
 * @param account   Account to grab from.
 */
module.exports.getFileListPromise = function(account) {
    return new Promise(function(resolve, reject){
        var bool = true;

        //resolve condition
        if (bool === true) {
            resolve(dataFromServer);
        } else {
            //reject condition
            reject('no data.');
        }
    });
};

module.exports.getFileListPromise2 = function(account) {
    return new Promise(function(resolve, reject){
        fs.readdir(process.cwd() + '/files/', {encoding:'utf8'}, function(err, files){
            if(err){
                reject('Error occurred reading file directory, actual error: ' + err);
            } else {
                resolve(dataPacker(files));
            }
        });
    });
};

// -------- helper functions --------
/**
 * Packs the data into a usable array of file info.
 * @param arr
 */
function dataPacker(arr) {
    var returndata = [];

    arr.forEach(function(elem, ind, arr){
        var stat = fs.statSync(process.cwd() + '/files/' + elem);
        var obj = {filename: elem, size: stat.size, last_modified: stat.mtime};

        returndata.push(obj);
    });

    return returndata;


}