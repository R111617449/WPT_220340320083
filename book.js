const express = require('express');
const app = express();

const mysql = require('mysql2');

 app.use(express.static("CM"));

app.listen(450);

app.get('/getbook', (req, resp) => {
    console.log("ajax function called");
    const dbobject = {
        host: 'localhost',
        user: 'root',
        password: 'cdac',
        database: 'store',
        port: 3306
    }
    
    const conn = mysql.createConnection(dbobject);

    let output = { status: false, detail: { bookid: 0, bookname: "",price:0 } }
    let bookid= req.query.bookid;
    console.log(bookid);
    conn.query('select bookid,bookname,price from book where bookid= ?', [bookid],
        (error, rows) => {
            if (error) {
                console.log(error);
            }
            else {
                if (rows.length > 0) {
                    output.status = true;
                    output.detail = rows[0];
                }
                else {
                    console.log("No book");
                }
            }
            console.log(output);
            resp.send(output);
        });

});

    app.get('/updatebook', (req, resp) => {
        console.log("ajax function called");
        const dbobject = {
            host: 'localhost',
            user: 'root',
            password: 'cdac',
            database: 'store',
            port: 3306
        }
        const conn = mysql.createConnection(dbobject);

        let output = { status: true }
        let bookid= req.query.bookid;
        let bookname = req.query.bookname;
        let price = req.query.price;
        console.log(bookid);
        conn.query('update book set bookname = ? where bookid = ?' , [bookname,price ,bookid],
            (error, res) => {
                if (error) {
                    console.log(error);
                }
                else {
                    if (res.affectedRows > 0) {
                        output.status = true;
                    }
                    else {
                        console.log(" update");
                    }
                }
                console.log(output);
                resp.send(output);
            });
    });  