const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session'); /* las sesiones te almacenan los datos en la memoria del servidor */
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');
const passport = require('passport'); /* se importa para ejecutar el código principal */



// initializations
const app = express();
require('./lib/passport');

// Settings
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'),'layouts'),
	partialsDir: path.join(app.get('views'),'partials'),
	extname: '.hbs',
	helpers: require('./lib/handlebars')
}));

app.set('view engine','.hbs');

// Middleware
app.use(session({
   secret: 'gusun0',
   resave: false, /* para que no se renueve la sesión */
   saveUnitialized: false,
   store: new MySQLStore(database) /* en donde se va a guardar la sesión */


}));
app.use(flash()); /* funcionalidad para mandar msj */ 
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); /* para aceptar desde el formulario los datos que manda el user */
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());



// Global variables
app.use((req,rex,next) => {
	app.locals.success = req.flash('success');
	app.locals.message = req.flash('message');
	next(); /* esta fn es para continuar con el resto del codigo */
	app.locals.user = req.user;
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));

// Public
app.use(express.static(path.join(__dirname,'public')));



// Starting the server
app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'));
});

