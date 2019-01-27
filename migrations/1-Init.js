'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Alumnes", deps: []
 * createTable "Assignaturas", deps: []
 * createTable "Notes", deps: [Alumnes, Assignaturas]
 * createTable "AssignaturaAlumne", deps: [Alumnes, Assignaturas]
 *
 **/

var info = {
    "revision": 1,
    "name": "Init",
    "created": "2019-01-27T18:51:55.782Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Alumnes",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "nom": {
                    "type": Sequelize.STRING,
                    "field": "nom"
                },
                "cognoms": {
                    "type": Sequelize.STRING,
                    "field": "cognoms"
                },
                "mail": {
                    "type": Sequelize.STRING,
                    "field": "mail",
                    "unique": true,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Assignaturas",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "nom": {
                    "type": Sequelize.STRING,
                    "field": "nom"
                },
                "professor": {
                    "type": Sequelize.STRING,
                    "field": "professor"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Notes",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "nota": {
                    "type": Sequelize.INTEGER,
                    "field": "nota"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "AlumneId": {
                    "type": Sequelize.INTEGER,
                    "field": "AlumneId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Alumnes",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "AssignaturaId": {
                    "type": Sequelize.INTEGER,
                    "field": "AssignaturaId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Assignaturas",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "AssignaturaAlumne",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "AlumneId": {
                    "type": Sequelize.INTEGER,
                    "field": "AlumneId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Alumnes",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "AssignaturaId": {
                    "type": Sequelize.INTEGER,
                    "field": "AssignaturaId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Assignaturas",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
