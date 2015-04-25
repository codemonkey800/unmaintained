let express    = require('express'),
    bodyParser = require('body-parser'),
    auth       = require('basic-auth'),
    bcrypt     = require('bcryptjs'),
    router     = express.Router();

let jsonParser = bodyParser.json();

// Config stuff
let config = require('../config');

// Salt for password
const SALT = bcrypt.genSaltSync(config.saltConstant);

let mongoose = require('mongoose'),     
    schemas  = require('./schemas');

// Builds the MongoDB url from the config file
let mongoDbUrl = 'mongodb://';
if(config.user && config.pass) {
    mongoDbUrl += `${config.user}:${config.pass}@`;
}
mongoDbUrl += `${config.host}:${config.port || 27017}/${config.db}`;

// Models
let PatientDocument = mongoose.model('PatientDocument', schemas.patientDocumentSchema, 'documents');
let Employee = mongoose.model('Employee', schemas.employeeSchema, 'employees');

router.openDatabase = function(cb) {
    mongoose.connect(mongoDbUrl);
    mongoose.connection.on('error', cb);
    mongoose.connection.once('open', () => {
        cb();
    });
};

router.closeDatabase = function(cb) {
    mongoose.connection.close(cb);
};

// Allow cross origin AJAX requests
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// Authentication step
router.use((req, res, next) => {
    let credentials = auth(req);
    if(!credentials) {
        res.sendStatus(401);
        return;
    }

    Employee.find({name: credentials.name})
            .exec((err, employees) => {
                if(!err) {
                    for(let employee of employees) {
                        if(bcrypt.compareSync(credentials.pass, employee.passHash)) {
                            res.locals.employee = employee;
                            next();
                            return;
                        }
                    }
                }
                res.sendStatus(401);
            });
});

router.get('/employee', (req, res) => {
    let query;
    if(req.query.title) {
        query = Employee.find({title: req.query.title});
    } else {
        query = Employee.find();
    }
    if(req.query.limit) {
        query = query.limit(req.query.limit);
    }
    if(req.query.skip) {
        query = query.skip(req.query.skip);
    }
    query.select('-passHash')
         .exec((err, employees) => {
            if(err) {
                res.sendStatus(400);
            } else {
                res.json(employees);
            }
    });
});

router.get('/employee/:id', (req, res) => {
    Employee.find({_id: req.params.id})
            .select('-passHash')
            .exec((err, employee) => {
                if(err) {
                    res.sendStatus(400);
                } else {
                    res.json(employee);
                }
            });
});

router.get('/form', (req, res) => {
    let query = PatientDocument.find();
    if(req.query.limit) {
        query = query.limit(req.query.limit);
    }
    if(req.query.skip) {
        query = query.skip(req.query.skip);
    }
    if(req.query.assignedDoctor) {
        query = query.find({assignedDoctor: req.query.assignedDoctor});
    }
    query.exec((err, forms) => {
        if(err) {
            res.sendStatus(400);
        } else {
            res.json(forms);
        }
    });
});

router.get('/form/:id', (req, res) => {
    PatientDocument.find({dateOfCreation: new Date(parseInt(req.params.id))})
                   .exec((err, form) => {
                        if(err) {
                            res.sendStatus(404);
                        } else {
                            res.json(form);
                        }
                   });
});

router.post('/form', jsonParser, (req, res) => {
    let title = res.locals.employee.title;
    
    try {
        let today = new Date();

        let patientDocumentModel = {
            _id: today.getTime(),
            dateOfCreation: today,
            name: req.body.name,
            age: req.body.age,
            dob: new Date(req.body.dob),
            height: req.body.height,
            weight: req.body.weight,
            bloodPressure: req.body.bloodPressure,
            temperature: req.body.temperature,
            symptoms: req.body.symptoms,
            currentMedication: req.body.currentMedication,
            allergies: allergies
        };

        if(title === 'Doctor') {
            patientDocumentModel.diagnosis = req.body.diagnosis || null;
            patientDocumentModel.perscription = req.body.perscription || null;
            patientDocumentModel.followUp = req.body.followUp || null;
        }

        for(let prop in patientDocumentModel) {
            if(!patientDocumentModel[prop]) {
                delete patientDocumentModel[prop];
            }
        }

        if(title === 'Nurse') {
            patientDocumentModel.assignedNurse = res.locals.employee._id;
            if(req.body.assignedDoctor) {
                patientDocumentModel.assignedDoctor = req.body.assignedDoctor;
            } else {
                throw 'Assigned doctor not specified';
            }
        } else if(title === 'Doctor') {
            patientDocumentModel.assignedNurse = req.body.assignedNurse;
            patientDocumentModel.assignedDoctor = res.locals.employee._id;
        }

        PatientDocument.create(patientDocumentModel, (err, patientDocument) => {
            if(err) {
                res.sendStatus(400);
            } else {
                res.json({
                    id: patientDocumentModel.dateOfCreation.getTime()
                });
            }
        });
    } catch(e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.put('/form/:id', jsonParser, (req, res) => {
    let title = res.locals.employee.title;
    
    try {
        let patientDocumentModel = {};

        if(req.body.name) {
            patientDocumentModel.name = req.body.name;
        }
        if(req.body.age) {
            patientDocumentModel.age = req.body.age;
        }
        if(req.body.dob) {
            patientDocumentModel.dob = new Date(req.body.dob);
        }
        if(req.body.height) {
            patientDocumentModel.height = req.body.height;
        }
        if(req.body.weight) {
            patientDocumentModel.weight = req.body.weight;
        }
        if(req.body.bloodPressure) {
            patientDocumentModel.bloodPressure = req.body.bloodPressure;
        }
        if(req.body.temperature) {
            patientDocumentModel.temperature = req.body.temperature;
        }
        if(req.body.symptoms) {
            patientDocumentModel.symptoms = req.body.symptoms;
        }
        if(req.body.currentMedication) {
            patientDocumentModel.currentMedication = req.body.currentMedication;
        }

        if(title === 'Doctor') {
            if(req.body.diagnosis) {
                patientDocumentModel.diagnosis = req.body.diagnosis;
            }
            if(req.body.perscription) {
                patientDocumentModel.perscription = req.body.perscription;
            }
            if(req.body.followUp) {
                patientDocumentModel.followUp = req.body.followUp;
            }
            if(req.body.assignedNurse) {
                patientDocumentModel.assignedNurse = req.body.assignedNurse;
            }
            if(req.body.assignedDoctor) {
                patientDocumentModel.assignedDoctor = req.body.assignedDoctor;
            }
        }

        PatientDocument.findOneAndUpdate({dateOfCreation: new Date(parseInt(req.params.id))}, 
                                         patientDocumentModel,
                                         (err) => {
            res.sendStatus((err) ? 400 : 200);
        });
    } catch(e) {
        res.sendStatus(400);
    }
});

router.delete('/form/:id', (req, res) => {
    PatientDocument.remove({dateOfCreation: new Date(parseInt(req.params.id))}, (err) => {
        res.sendStatus((err) ? 400 : 200);
    });
});

module.exports = router;