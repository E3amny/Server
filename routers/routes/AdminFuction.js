const express = require("express");
const { GetAllUser, GetAllFundraiser, GetAllPendingPost, deleteFundraisers, AcceptFundraisers, rejectedTheFunders, createNewStory, updateStroy, deleteStroy, getAllStroy, ConvertToPending, getAllFundraiserInDashbord } = require("../controllers/AdminFuction");

///Define router
const adminRouter = express.Router();

// middlewares
const authentication = require("../middlewares/authentication")

//Routes
///  [get]  [http://localhost:5000/admin]
adminRouter.get('/users', GetAllUser);

///  [get]  [http://localhost:5000/admin/fundraiser]
adminRouter.get('/fundraiser', GetAllFundraiser);

///  [get]  [http://localhost:5000/admin/pending]
adminRouter.get('/pending', GetAllPendingPost);

///  [put]  [http://localhost:5000/admin/:id]
adminRouter.put('/:id', deleteFundraisers);

///  [put]  [http://localhost:5000/admin/accept/:id]
adminRouter.put('/accept/:id', AcceptFundraisers);

///  [put]  [http://localhost:5000/admin/rejected/:id]
adminRouter.put('/rejected/:id', rejectedTheFunders);

///  [post]  [http://localhost:5000/admin/story]
adminRouter.post('/story', createNewStory);

///  [get]  [http://localhost:5000/admin/story]
adminRouter.get('/story', getAllStroy);

///  [put]  [http://localhost:5000/admin/story/:id]
adminRouter.put('/story/:id', updateStroy)

///  [delete]  [http://localhost:5000/admin/story/delete/:id]
adminRouter.delete('/story/delete/:id', deleteStroy);

adminRouter.put('/batataa/batata/pending/:id', ConvertToPending)

adminRouter.get('/manger/view/post/dashbord/:id', getAllFundraiserInDashbord)

module.exports = adminRouter;