const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
    try {
        const { taskId, content } = req.body;
        const userId = req.user.id;

        const comment = await Comment.create({ taskId, userId, content });

        // Emit WebSocket event
        const io = req.app.get("socketio");
        io.emit("newComment", comment);

        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCommentsByTask = async (req, res) => {
    try {
        const comments = await Comment.findAll({ where: { taskId: req.params.taskId } });
        res.json(comments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
