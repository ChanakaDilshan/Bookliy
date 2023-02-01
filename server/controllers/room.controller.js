const db = require("../models");
const Room = db.rooms;
const User = db.user;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Room
    const room = new Room({
      title: req.body.title,
      description: req.body.description,
      tel: req.body.tel,
      username: req.body.username,
      published: req.body.published ? req.body.published : false
    });
  
    // Save Room in the database
    room
      .save(room)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating a Room."
        });
      });
  };

  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Room.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Rooms."
        });
      });
  };  

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Room.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Room with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Room with id=" + id });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Room.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Room with id=${id}. Maybe Room was not found!`
          });
        } else res.send({ message: "Room was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Room with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Room.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Room with id=${id}. Maybe Room was not found!`
          });
        } else {
          res.send({
            message: "Room was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Room with id=" + id
        });
      });
  };
  
  exports.deleteAll = (req, res) => {
    Room.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Rooms were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Rooms."
        });
      });
  };

  exports.findAllPublished = (req, res) => {
    Room.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Rooms."
        });
      });
  };
  
  