const http = require('http');
const url = require('url');
const mysql = require('mysql');
const { parse } = require('querystring');

let connect = {
    host: "localhost",
    user: "root",
    database: "oil",
    password: ""
};


http.createServer((request, response) => {
    console.log('server work');
    if (request.method === 'GET') {
        let urlRequest = url.parse(request.url, true);
        let query, conn;
        let data = urlRequest.query;

        response.setHeader('Access-Control-Allow-Credentials', true);
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

        switch (urlRequest.query.type) {

            // получение всех статей
            case 'allArticle':

                conn = mysql.createConnection(connect);

                conn.connect(function (err) {
                    if (err) {return console.error("Ошибка: " + err.message)}
                    else {console.log("Подключение к серверу MySQL успешно установлено")}
                });

                query="SELECT * FROM article";
                conn.query(query, (err, result, field) =>{
                    if (err) throw err;
                    conn.end();
                    response.setHeader('Content-Type', 'application/json');
                    response.end(JSON.stringify(result));
                });

                break;

            // сортировка статей
            case 'sortArticle':   // field=price & order=asc

                let field = '';

                if (data.field === 'title') {
                    field = 'title'
                } else if (data.field === 'description') {
                    field = 'description'
                } else if (data.field === 'mark') {
                    field = 'mark'
                } else if (data.field === 'vendor') {
                    field = 'vendor'
                } else if (data.field === 'price') {
                    field = 'price'
                }

                let order;

                if (data.order === 'asc') {
                    order = 'ASC'
                } else {
                    order = 'DESC'
                }

                conn = mysql.createConnection(connect);

                conn.connect(function (err) {
                    if (err) {return console.error("Ошибка: " + err.message)}
                    else {console.log("Подключение к серверу MySQL успешно установлено")}
                });

                query="SELECT * FROM article ORDER BY " + field + " " + order;
                conn.query(query, (err, result, field) =>{
                    if (err) throw err;
                    conn.end();
                    response.setHeader('Content-Type', 'application/json');
                    response.end(JSON.stringify(result));
                });

                break;

            case 'searchArticle':   // title

                conn = mysql.createConnection(connect);

                conn.connect(function (err) {
                    if (err) {return console.error("Ошибка: " + err.message)}
                    else {console.log("Подключение к серверу MySQL успешно установлено")}
                });

                query="SELECT * FROM article WHERE title LIKE '%" + data.title +"%'";
                conn.query(query, (err, result, field) =>{
                    if (err) throw err;
                    conn.end();
                    response.setHeader('Content-Type', 'application/json');
                    response.end(JSON.stringify(result));
                });


                break;

            case 'deleteItem':

                conn = mysql.createConnection(connect);

                conn.connect(function (err) {
                    if (err) {return console.error("Ошибка: " + err.message)}
                    else {console.log("Подключение к серверу MySQL успешно установлено")}
                });

                query="DELETE FROM article WHERE id=" + data.id;
                conn.query(query, (err, result, field) =>{
                    if (err) throw err;
                    conn.end();
                    response.setHeader('Content-Type', 'application/json');
                    response.end(JSON.stringify(result));
                });


                break;
        }


    } else {
        // POST
        let body = '';
        let query, conn;

        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {

            let params = parse(body);
            
            switch (params.type) {
                case 'addPost':

                    conn = mysql.createConnection(connect);

                    conn.connect(function (err) {
                        if (err) {return console.error("Ошибка: " + err.message)}
                        else {console.log("Подключение к серверу MySQL успешно установлено")}
                    });
                    console.log('addPost');

                  //  query="SELECT COUNT(*) as count FROM article";
                    query="SELECT id FROM article ORDER BY id DESC LIMIT 1";
                    conn.query(query, (err, result, field) =>{
                        if (err) throw err;

                        response.setHeader('Content-Type', 'application/json');

                        let countArticles = Number(JSON.stringify(result[0].id)) + 1;

                        query="INSERT article(id, title, description, mark, vendor, price) VALUES (" + countArticles + ", '" + params.title + "', '" + params.description + "', '" + params.mark + "', '" + params.vendor + "', " + params.price + ")";

                        conn.query(query, (err, result, field) =>{
                            if (err) throw err;
                            conn.end();
                            response.setHeader('Content-Type', 'application/json');
                            response.end(JSON.stringify(result));
                        });

                        
                    });

                    break;

                case 'editPost':

                    conn = mysql.createConnection(connect);

                    conn.connect(function (err) {
                        if (err) {return console.error("Ошибка: " + err.message)}
                        else {console.log("Подключение к серверу MySQL успешно установлено")}
                    });

                    // UPDATE books SET price=263.00, discount=10, amount=amount-2 WHERE id=3;

                    query="UPDATE article SET title='" + params.title + "', description='" + params.description + "', mark='" + params.mark + "', vendor='" + params.vendor + "', price=" + params.price + " WHERE id=" + params.id;
                    conn.query(query, (err, result, field) =>{
                        if (err) throw err;
                        conn.end();
                        response.setHeader('Content-Type', 'application/json');
                        response.end(JSON.stringify(result));

                    });

                    break;
            }

        });
    }

}).listen(3000);