const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 8000;


const dashboardAuthRoutes = require('./routes/dashboard_auth_route'); 
const dashboardRoutes = require('./routes/dashboard_route');
const dashboardUserRoutes = require('./routes/dashboard_user_route');
const classRoutes = require('./routes/class_route');
const subjectRoutes = require('./routes/subject_route');
const mediumRoutes = require('./routes/medium_route');
const materialRoutes = require('./routes/material_route');
const languageRouter = require('./routes/language_route');
const categoryRouter = require('./routes/category_route');
const newsRouter = require('./routes/news_route');
const sliderRouter = require('./routes/slider_route');
const notificationRouter = require('./routes/notification_route');
const reportRouter = require('./routes/report_route');
const reviewRouter = require('./routes/review_route');
const supportRouter = require('./routes/support_route');
const versionRouter = require('./routes/version_route');
const settingRouter = require('./routes/setting_route');

const errorHandlers = require('./middleware/errorHandlers');
const connectToDatabase = require('./services/mongodb/mongodbService');

const mongodbKey= require('./config/mongoConfig').mongodbKey;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());

app.get('/', (req, res) => {    
    res.send('Welcome to the API');
}   );

app.use('/api/v2/dashboard',dashboardRoutes);
app.use('/api/v2/dashboard/auth',dashboardAuthRoutes);
app.use('/api/v2/dashboard/user',dashboardUserRoutes);
app.use('/api/v2/class',classRoutes);
app.use('/api/v2/subject',subjectRoutes);
app.use('/api/v2/medium',mediumRoutes);
app.use('/api/v2/material',materialRoutes);
app.use('/api/v2/language',languageRouter)
app.use('/api/v2/category',categoryRouter)
app.use('/api/v2/news',newsRouter)
app.use('/api/v2/notification',notificationRouter)
app.use('/api/v2/slider',sliderRouter)
app.use('/api/v2/report',reportRouter)
app.use('/api/v2/review',reviewRouter);
app.use('/api/v2/support',supportRouter);
app.use('/api/v2/Version',versionRouter);
app.use('/api/v2/setting',settingRouter);
app.use(errorHandlers);

async function startServer() {
    try {
        await connectToDatabase(mongodbKey);   
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
}


startServer();
