const yargs = require('yargs');
const fs = require('fs');


yargs.command({
    command: 'list',
    describe: 'Liste toutes mes notes',
    handler: () => {
        console.log("Voici la liste des notes:");

        fs.readFile("data.json", "utf-8", (err, dataStr) => {
            if (err) console.log(err);
            else {
                const notes = JSON.parse(dataStr);

                notes.forEach(note => {
                    console.log(`${note.id}. ${note.title}`);
                })
            }
        })
    }
}).command({
    command: 'add',
    describe: "Ajoute une note",
    builder: {
        title: {
            describe: "Titre de ma note",
            demandOption: true,
            type: "string"
        },
        message: {
            describe: "Message de ma note",
            demandOption: false, 
            type: "string"
        }
    },
    handler: (argv) => {
        fs.readFile("data.json", "utf-8", (err, dataStr) => {
            
            const notes = JSON.parse(dataStr);


            const newNote = {
                id: `${notes.length+1}`,
                title: argv.title,
                message: argv.message

                }
            
            notes.push(newNote);

            const notesJSON = JSON.stringify(notes);

            fs.writeFile("data.json", notesJSON, (err) => {
                (err?console.log(err):console.log("La note a été ajoutée"));
            })
        })

        
    }
}).command({
    command: 'remove',
    describe: "Supprime une note",
    builder: {
        id: {
            describe: "Message de ma note",
            demandOption: false, 
            type: "string"
        }
    },
    handler: (argv) => {
        console.log("Chaud pour supprimer une note");
        fs.readFile("data.json", "utf-8", (err, dataStr) => {
            
            const notes = JSON.parse(dataStr);

            console.log(notes);
            
            notes.forEach((function(note) {
                if (note.id === argv.id) {
                    notes.splice(note);
                }
            });

            console.log(notes);
        })

    }
}).command({
    command: 'read',
    describe: "Affiche le détail d'une note",
    handler: () => {
        console.log("Voici le détail d'une note");
    }
}).argv;