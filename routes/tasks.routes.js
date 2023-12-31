const router = require("express").Router();

const mongoose = require("mongoose");

const User = require("../models/User.model");
const Task = require("../models/Task.model");

const queryFromParams = (req) => {
    return { _id: req.params.taskId, owner: req.__jwt_userId};
}

//  POST /api/tasks  -  Creates a new task
router.post("/", (req, res) => {
  Task.create({ title: req.body.title, owner: req.__jwt_userId })
    .then(response => res.status(201).json(response))
    .catch(err => res.status(500).json(err));
});

router.get("/", (req, res) => {
    console.log("payload", req.payload);
    
    const todayDate = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());

    Task.find({owner: req.__jwt_userId})
    //   .populate('owner')
      .then(tasks => {
        const displayedTasks = tasks.filter(t=> !t.finishedDate || t.finishedDate > todayDate)
        res.status(200).json(displayedTasks)
      })
      .catch(err => res.status(500).json(err));
  });

//  GET /api/tasks/:taskId  -  Get details of a specific task by id
router.get('/:taskId', (req, res) => {
    const query = queryFromParams(req);

    if (!mongoose.Types.ObjectId.isValid(query._id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Task.findOne(query)
        // .populate('owner')
        .then(task => res.json(task))
        .catch(err => {
            console.log("error getting details of a task", err);
            res.status(500).json({
                message: "error getting details of a task",
                error: err
            });
        })
});


// PUT /api/tasks/:taskId  -  Updates a specific task by id
router.put('/:taskId', (req, res) => {
    const query = queryFromParams(req);

    if (!mongoose.Types.ObjectId.isValid(query._id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Task.findOneAndUpdate(query, req.body, { new: true })
        .then((updatedTask) => res.json(updatedTask))
        .catch(err => {
            console.log("error updating task", err);
            res.status(500).json({
                message: "error updating task",
                error: err
            });
        })
});

// PUT /api/tasks/:taskId/status  -  Updates a specific task by id
router.put('/:taskId/status', (req, res) => {
    const query = queryFromParams(req);

    if (!mongoose.Types.ObjectId.isValid(query._id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    const finishedDate = req.body.done ? new Date() : null;
    Task.findOneAndUpdate(query, { finishedDate }, { new: true })
        .then((updatedTask) => res.json(updatedTask))
        .catch(err => {
            console.log("error updating task", err);
            res.status(500).json({
                message: "error updating task",
                error: err
            });
        })
});

// DELETE /api/tasks/:taskId  -  Delete a specific task by id
router.delete('/:taskId', (req, res) => {
    const query = queryFromParams(req);

    if (!mongoose.Types.ObjectId.isValid(query._id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Task.findOneAndRemove(query)
        .then(() => res.json({ message: `Task with id ${query._id} was removed successfully.` }))
        .catch(err => {
            console.log("error deleting task", err);
            res.status(500).json({
                message: "error deleting task",
                error: err
            });
        })
});
  
module.exports = router;
