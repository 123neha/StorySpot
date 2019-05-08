const Story = require('../models/story.model');
const storyController = {};

storyController.create = (req, res) => {
    req.checkBody('title', 'Invalid/Empty title').notEmpty();
    req.checkBody('createdBy', 'Invalid/Empty author').notEmpty();
    const errors = req.validationErrors(true);
    if (errors) {
        return res.status(400).json({ 'Validation errors': errors });
    }

    const newStory = new Story({
        title: req.body.title,
        content: req.body.content,
        status: 'draft',
        createdBy: req.body.createdBy,
        createdOn: Date.now(),
        lastModifiedOn: Date.now()
    });
    newStory.save()
        .then(() => {
            res.send({
                success: true,
                message: `Draft saved successfully`,
                data: newStory
            });
        })
        .catch((err) => {
            res.send({
                success: false,
                message: '**** Something went wrong while creating the story ****',
                errDetails: err
            });
        });

};

storyController.findAll = (req, res) => {
    const pageNumber = req.query.pageNumber;
    const status = req.query.status;
    let sortBy = req.query.sort;
    let field, order;

    let statusParams = {};
    if (status) {
        statusParams['status'] = status;
    }

    let sortParams = {};
    if (status === 'published') { // to show unread stories first, by default
        sortParams['readBy'] = 1;
    }

    if (sortBy) {
        sortParams = {};
        if (sortBy.indexOf(':') > -1) {
            sortBy = sortBy.split(':');
            field = sortBy[0];
            order = sortBy[1];
        } else {
            field = sortBy;
            order = 'asc';
        }
        sortParams[field] = (order === 'asc' ? 1 : -1);
    }
    Story.find(statusParams)
        .sort(sortParams)
        .populate('createdBy', ['_id', 'email', 'firstName', 'lastName'])
        .exec()
        .then((stories) => {
            if (stories && stories.length) {
                const totalItems = stories.length;
                const initialIndex = (pageNumber - 1) * 10;
                const itemsToReturn = pageNumber
                    ? stories.slice(initialIndex, initialIndex + 10)
                    : stories;
                res.send({
                    success: true,
                    message: 'Story(s) found successfully',
                    data: itemsToReturn,
                    totalItems
                });
            } else {
                res.send({
                    success: false,
                    message: 'No record found in system',
                    data: []
                });
            }
            return null;
        })
        .catch((err) => {
            res.send({
                success: false,
                message: '**** Something went wrong while fetching the stories ****',
                err_details: err
            });
        });
};

storyController.findById = (req, res) => {
    Story.find({
        _id: req.params.id
    }).exec()
        .then((story) => {
            res.send({
                success: true,
                message: 'Story has been found successfully',
                data: story
            });
        })
        .catch((err) => {
            res.send({
                success: false,
                message: '**** Something went wrong while fetching the story ****',
                err_details: err
            });
        });
};

module.exports = storyController;