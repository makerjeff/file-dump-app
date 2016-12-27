/**
 * File Dump App main server.
 * Created by jeffersonwu on 12/25/16.
 */


// ===================
// MODULES ===========
// ===================

const express       = require('express');
const app           = express();
const http          = require('http').Server(app);  //shortcut to httpserver with Express app.
const hbsModule     = require('express-handlebars');
const chalk         = require('chalk');
const clear         = require('clear');

// --------------------
// custom modules -----
const fdb           = require('./models/files-db');


// ====================
// CONFIGURATION ======
// ====================
var server_version  = '0.0.3b';

const handlebars    = hbsModule.create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


const port          = process.env.PORT || 3000;




// ====================
// MIDDLEWARE =========
// ====================

// --- basic logger ---
// TODO: switch to Morgan, or encapsulate into module
app.use(function(req,res,next){
    console.log(new Date() + ' ' + req.method + ' ' + req.url + ' ');
    next();
});

// =====================
// ROUTES ==============
app.get('/', function(req, res){
    res.render('index', {status: 'success', server: server_version, payload: {message:'yay.'}});
});

app.get('/fileList', function(req, res){
    fdb.getFileListPromise('dummy').then(function(val){
        console.log(val);
        res.json(val);
    }).catch(function(reason){
        console.log('Promise rejected. ' + reason);
        res.send(reason);
    });
});

app.get('/download/:file', function(req, res){
    //TODO: to JWT.verify here before sending file.
    res.sendFile(process.cwd() + '/files/' + req.params.file);
});

// ========================
// CATCH ALL MIDDLEWARE ===
// ========================
//static files
app.use(express.static('public/'));

// 404
app.use(function(req,res,next){
    res.status(404);
    res.send('404: Page not found!');
});

// 500
app.use(function(req,res,next){
    res.status(500);
    res.render('500: Server error!');
});


// ========================
// ===== START SERVER =====
// ========================

http.listen(port, function(err){
    if(err) {
        console.log(Error('Error: ' + err));
    } else {
        clear();
        console.log(chalk.green('File Dump Server running on port ' + port));
        console.log(chalk.black.bgYellow(' Sever version: ' + server_version + ' '));

    }
});