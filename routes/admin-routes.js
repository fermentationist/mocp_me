const adminRoutes = (function(){
	// Clears terminal window
	process.stdout.write('\033c');
	console.log("\n\n\nadmin-routes.js loaded\n\n\n");
	// Dependencies
	const jwtCheck = require("./jwtCheck.js");
	const path = require("path");
	const bodyParser = require("body-parser");
	// Passes the db object to the routes
	const db = require("./../models/index");

	// Instantiate express router
	const router = require("express").Router();

	// Middleware
	router.use(bodyParser.urlencoded({extended: false}));
	router.use(bodyParser.json());
	router.use(jwtCheck);


	// API Routes go here
	router.get("/user-tags", (req, res) => {
		console.log("admin/all-tags call received by backend");
		db.user_tags.findAll().then(Tags => {
			res.json(Tags);
		});
	});

	router.get("/pending-tags", (req, res) => {
		console.log("admin/pending-tags call received by backend");
		db.user_tags.findAll({
			where: {
				approved: false
			},
			include: [db.Photos]
		}).then(Tags => {
			res.json(Tags);
		});
	});
	
	// Post Update Delete and Approve Admin Routes
	router.post("/add-tag", function (req, res) {
		console.log(req.body);
		// create takes an argument of an object describing the item we want to insert into our table.
		db.user_tags.create({
			tag_name: req.body.tag_name,
			photo_id: req.body.photo_id,
			approved: req.body.approved
		}).then(function (addedTag) {
			// We have access to the new todo as an argument inside of the callback function
			res.json(addedTag);
		});
	});

	//Update all tag content including approval
	router.put("/update", function (req, res) {
		db.user_tags.update({
			tag_name: req.body.tag_name,
			photo_id: req.body.photo_id,
			approved: req.body.approved
		},{
			where: {
				id: req.body.id
			}
		})
		.then(function (updated) {
			res.json(updated);
		});
	})

	//Update only tags approval to true
	router.put("/approval/:tagId", function (req, res) {
		db.user_tags.update({ 
			approved: true 
		},{
			where: { id: req.params.tagId }
		})
		.then(function (approved) {
			console.log(approved, " has been approved");
			res.json(approved)
		});
	})

	// Delete from DB
	router.delete("/delete/:tagId", function (req, res) {
		console.log("admin/delete call received by backend");
		console.log(`/delete/${req.params.tagId} called`);
		// We just have to specify which tag we want to destroy with "where"
		db.user_tags.destroy({
			where: {
				id: req.params.tagId
			}
		}).then(function (deleted) {
			console.log(deleted, " has been deleted");
			res.json(deleted);
		});
	});

	// Catch-all route
	router.get("/420", (req, res) => res.json({answer: 420}));

	router.get("*", (req, res) => res.json({answer: 42}));

	return router;
	
})();

module.exports = adminRoutes;