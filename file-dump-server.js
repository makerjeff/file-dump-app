/**
 * File Dump App main server.
 * Created by jeffersonwu on 12/25/16.
 */


// ===================
// MODULES ===========
// ===================

const app           = require('express')(); //shortcut to express app.
const http          = require('http').Server(app);  //shortcut to httpserver with Express app.
const hbsModule     = require('express-handlebars');
const chalk         = require('chalk');
const clear         = require('clear');


// ====================
// CONFIGURATION ======
// ====================
var server_version  = '0.0.1';

const handlebars    = hbsModule.create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', handlebars);


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
        console.log(chalk.green('Making America great again on port ' + port));
        console.log(chalk.black.bgYellow(' Sever version: ' + server_version + ' '));

        // -- TEST --
        console.log(sdb.credentials);
        console.log('Token lifespan: ' + tokenLifespan);
    }
});