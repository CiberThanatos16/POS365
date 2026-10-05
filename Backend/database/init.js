const db = require('./db');

db.serialize(() => {



    /*
        db.run(`
                DROP TABLE IF EXISTS product;
            `)
        
    db.run(`
        DROP TABLE IF EXISTS sale_items;
    `)
    
    db.run(`
        DROP TABLE IF EXISTS business;
    `)
    
    db.run(`
        DROP TABLE IF EXISTS sales;
    `)
*/

    /*
        db.run(`
            CREATE TABLE IF NOT EXIST img_product(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                img TEXT,
                fore
            );
            `)
        */

    db.run(`
            CREATE TABLE IF NOT EXISTS product(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            img TEXT,
            name TEXT NOT NULL,
            stock INTEGER NOT NULL DEFAULT 0,
            price_sale REAL NOT NULL,
            price_input REAL NOT NULL
        );
    `);

    db.run(`
            CREATE TABLE IF NOT EXISTS sales(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            total REAL NOT NULL,
            iva REAL NOT NULL,
            subtotal REAL NOT NULL,
            total_input REAL NOT NULL,
            tipe_sale TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    db.run(`
            CREATE TABLE IF NOT EXISTS sale_items(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sale_id INTEGER,
            product_id INTEGER,
            quantity INTEGER,
            price REAL,
            price_input REAL,
            tipe_sale TEXT,
            FOREIGN KEY(sale_id) REFERENCES sales(id)
        );
    `);



    db.run(`
            CREATE TABLE IF NOT EXISTS input(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name_input TEXT NOT NULL,
            inputs TEXT NOT NULL,
            total REAL NOT NULL
        );
    `);


    db.run(`
            CREATE TABLE IF NOT EXISTS business(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name_business TEXT
        );
    `);

    db.run(`
            INSERT INTO business(id, name_business)
            SELECT 1, ''
            WHERE NOT EXISTS(
            SELECT 1 FROM business WHERE id = 1
        );
    `);

    /*
    a esta tabla se conectara tabla negocio, el usuario sabra si es admin o invitdo o tiene otro roll
    db.run(`
            CREATE TABLE IF NOT EXISTS user(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_user TEXT NOT NULL,
        password TEXT NOT NULL,
        rol TEXT NOT NULL
    );
    `);
    */

});
//console.log("Tablas Borradas");
console.log("Tablas verificadas");