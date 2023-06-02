import path from 'path';
import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import RouteManager from './routes/RouteManager';
import DB from './models/engine/DBStorage';
import userAgent from 'express-useragent';
import methodOverride from 'method-override';
import deserializeUser from './middlewares/deserializeUser';
import session from 'express-session';
import flash from 'connect-flash';
import cors from 'cors';
const dateFormat = require('handlebars-dateformat');
dotenv.config();

class App {
  public app!: Application;
  public port!: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT);
    this.middlewares();
    this.settings();
  }

  middlewares() {
    this.app.engine(
      'hbs',
      engine({
        extname: 'hbs',
        helpers: {
          equals: function (a: any, b: any) {
            return a === b;
          },
          dateFormat: dateFormat,
          math: function (lvalue: string, operator: string, rvalue: string) {
            return {
              '+': parseFloat(lvalue) + parseFloat(rvalue),
            }[operator];
          },
          not: function (a: string) {
            return !a;
          },
        },
      })
    );
    this.app.set('view engine', 'hbs');
    this.app.set('views', path.join(__dirname, '../views'));
    this.app.use(express.static(path.join(__dirname, '..', 'public')));
    this.app.use(express.json({}));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan('dev'));
    this.app.use(cors({ origin: '*' }));
    this.app.use(userAgent.express());
    this.app.use(
      methodOverride((req: Request, res: Response) => {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
          // look in urlencoded POST bodies and delete it
          var method = req.body._method;
          delete req.body._method;
          return method;
        }
      })
    );
    this.app.use(cookieParser(process.env['COOKIE_SECRET']));
    this.app.use(
      session({
        secret: process.env['SESSION_SECRET'] as string,
        saveUninitialized: true,
        resave: false,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24,
        },
      })
    );
    this.app.use(flash());
    this.app.use(deserializeUser);
    // App local variables
    this.app.use((req, res, next) => {
      res.locals.info = req.flash('info');
      res.locals.error = req.flash('error');

      next();
    });
  }

  settings() {
    DB.sync({ alter: false }).catch((err) => {
      console.log(err.message);
    });
    new RouteManager(this.app);
    this.app.listen(this.port, () =>
      console.log(`Server is running on PORT ::${this.port}`)
    );
  }
}

function run() {
  const app = new App();
}

if (require.main === module) {
  run();
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
