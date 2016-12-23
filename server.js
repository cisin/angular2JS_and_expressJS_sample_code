var express = require('express');
var mongojs = require('mongojs');
var db = mongojs('todos', ['todos', 'users']);
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
app.use(express.static(__dirname + "./public/"));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

///////////------- get --------////////////////

app.get('/todos/:email', function (req, res) {
	db.todos.find({ email: req.params.email }, function (err, docs) {
		res.json(docs)
	})
});


///////////------- post --------////////////////

app.post('/todos', function (req, res) {
	req.body.createdOn = new Date();
	db.todos.insert(req.body, function (err, doc) {
		res.json({ result: 1, data: doc });
	});
});

///////////------- delete --------////////////////

app.delete('/todos/:id', function (req, res) {
	var id = req.params.id;
	db.todos.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
		if (err) {
			console.log("the error is:", err)
		} else {
			res.json(doc)
		}
	});
});

///////////------- get + id --------////////////////

app.get('/todos/:id', function (req, res) {
	var id = req.params.id;
	db.todos.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
		res.json(doc);
	});
});

///////////------- put --------////////////////

app.put('/todos', function (req, res) {

	db.todos.findAndModify({
		query: { _id: mongojs.ObjectId(req.body.id) },
		update: { $set: { status: (req.body.status == false) ? true : false } },
		new: true
	}, function (err, doc) {
		res.json(doc);
	});
});

///////////------- edit todo --------////////////////

app.put('/edittodo', function (req, res) {
	db.todos.findAndModify({
		query: { _id: mongojs.ObjectId(req.body.id) },
		update: { $set: { todo: req.body.todo } },
		new: true
	}, function (err, doc) {
		res.json(doc);
	});
});

///////////------- User account --------////////////////

app.post('/register', function (req, res) {
	db.users.find({ email: req.body.email }, function (err, doc) {
		if (!doc.length == 0) {
			res.json({ result: 0, message: 'email id already present' })
		} else {
			db.users.insert(req.body, function (err, doc) {
				res.json({ result: 1, data: doc })
			})
		}
	})
});

app.post('/login', function (req, res) {
	db.users.find({ email: req.body.email }, function (err, doc) {
		if (doc.length == 0) {
			res.json({ result: 0, message: "Invalid email" })
		} else {
			if (doc[0].password != req.body.password) {
				res.json({ result: 0, message: "Invalid password" })
			} else {
				res.json({ result: 1, data: doc[0]._id })
			}
		}
	})
});

app.post('/getUser', function (req, res) {
	db.users.find({ _id: mongojs.ObjectId(req.body.id) }, function (err, doc) {
		res.json({ result: 1, data: doc[0] });
	})
});

app.get("/public/*", function (req, res) {
	console.log("public access", req.originalUrl);
	res.sendFile(__dirname + req.originalUrl);
});

app.get('/', function (req, res) {
	filePath = __dirname + '/public/index.html';
	setTimeout(function(){
		res.sendFile(filePath);
	},3000);
	// res.sendFile(filePath);
});

app.get("*", function (req, res) {
	var path = __dirname + "/public" + req.originalUrl, flagVal = false;
	fs.exists(path, function (exists) {
		if (exists)
			res.sendFile(path);
		else
			res.redirect("/");
	});
})


app.listen(8080);
console.log("Application started on port 8080, http://localhost:8080");