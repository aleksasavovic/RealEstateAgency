import express, { json, Request, Response } from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose, { Document, Schema } from 'mongoose'
import user from './model/user';
import realEstate from './model/realEstate';
import recomended from './model/promoted';
import promoted from './model/promoted';
import async, { eachOf, rejectSeries } from 'async';
import conversation from './model/conversation';
import profit from './model/profit';


var ObjectId = require('mongoose').Types.ObjectId;
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/nekretnine");

const conn = mongoose.connection;

conn.once('open', () => {
    console.log('Uspesna konekcija');
});

const router = express.Router();

const multer = require("multer");

const DIR = './uploads/';
app.use('/uploads', express.static('uploads'));
//upload pic
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, DIR);
    },
    filename: (req: any, file: any, cb: any) => {

        cb(null, `${Date.now()}_${file.originalname}`);

    }
});

var upload = multer({ storage: storage });


//routes
router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user.findOne({ "username": username, "password": password }, (err, user) => {
        if (err) console.log(err);
        else res.json(user);
    })
});
router.route('/getUserByUsername').post((req, res) => {
    let username = req.body.username;
    user.findOne({ "username": username }, (err, userRet) => {
        res.json(userRet);
    })
})

router.route('/register').post((req, res) => {
    let u = new user(req.body);
    let username = req.body.username;
    let email = req.body.email;
    user.findOne({ "username": username }, (err, userObj) => {
        if (userObj) {

            res.json({ "msg": "username is already taken" });
        }
        else {
            console.log(err);
            user.findOne({ "email": email }, (err2, userObj2) => {
                if (userObj2) {

                    res.json({ "msg": "email is already in use" });
                }
                else {
                    console.log(err2);
                    u.save().then(u => {
                        res.json({ "msg": "" });
                    }).catch(saveErr => {
                        res.json({ "msg": "unable to creat account, please try again" });
                    });
                }

            });
        }
    });
});


router.post('/changeProfilePicture', upload.single("picture"), (req, res) => {

    let file = (req as any).file;

    if (file) {
        user.collection.updateOne({ "username": req.body.username }, { $set: { "picture": file.filename } });
        res.json((req as any).file);
    }
    else {

    }


});


router.route("/guestSearch").post((req, res) => {

    let city = req.body.city;
    let minPrice = req.body.minPrice;
    let maxPrice = req.body.maxPrice;
    let query: any;
    if (city != "")
        query = {
            "adress.city": { $regex: '.*' + city + '.*', $options: 'i' },
            "price": { $gte: minPrice, $lte: maxPrice }
        };
    else
        query = {
            "price": { $gte: minPrice, $lte: maxPrice }
        };
    query.aproved = "yes";

    realEstate.find(query, (err, realEstates) => {
        if (err) console.log(err);
        else {

            res.json(realEstates);
        }
    });
});

router.route("/getUsersRealEstates").post((req, res) => {
    let username = req.body.username;
    realEstate.find({ "owner": username }, (err, realEstates) => {
        if (err) console.log(err);
        else res.json(realEstates);
    })
});

router.route("/getAllRealEstates").get((req, res) => {
    realEstate.find({}, (err, realEstates) => {
        if (err) console.log(err);
        else res.json(realEstates);
    })
});

router.route("/getPendingRealEstates").get((req, res) => {
    realEstate.find({ "aproved": "no" }, (err, realEstates) => {
        if (err) console.log(err);
        else res.json(realEstates);
    });
});


router.route("/promotedRealEstates").get((req, res) => {
    promoted.find({}, (err, promotedRealEstates) => {
        if (err)
            console.log(err);
        else {

            let realEstates: mongoose.Document[] = [];
            let count = 0;

            for (let re of promotedRealEstates) {
                realEstate.findOne({ "_id": re.get("realEstateID") }, (err2, retREobj) => {

                    if (err2)
                        console.log(err2);
                    else {

                        realEstates.push(retREobj);

                        count++;
                        if (count == promotedRealEstates.length)
                            res.json(realEstates);
                    }

                });

            }
            /*  var bar=new Promise((resolve,rejact)=>{
                 promotedRealEstates.forEach((re)=>{
                     realEstate.findOne({"_id":re.get("realEstateID")},(err2,retREobj)=>{
                         
                         if(err2)
                             console.log(err2);
                         else{
                                 
                             realEstates.push(retREobj);
                             console.log(realEstates);
                         
                         }
     
                     });
                 });
             });
             bar.then(() => {
                 console.log('All done!');
             });*/


            /*async.each(promotedRealEstates,(re,next)=>{
                realEstate.findOne({"_id":re.get("realEstateID")},(err2,retREobj)=>{
                    if(err2)
                        console.log(err2);
                    else{
                        
                        realEstates.push(retREobj);
                        console.log(realEstates);
                    
                    }

                });
                next();
            },(err3)=>{
                if(err3)
                    console.log(err3);
                else{
                    console.log(realEstates);
                    res.json(realEstates);
                }

            });*/



        }

    });

});

router.route('/editUserInfo').post((req, res) => {

    let editValue = req.body.editValue;
    let username = req.body.username;
    let whatToEdit = req.body.whatToEdit;
    let query: any = {};
    if (whatToEdit == "firstName")
        query.firstName = editValue;
    else if (whatToEdit == "lastName")
        query.lastName = editValue;
    else if (whatToEdit == "email")
        query.email = editValue;
    else if (whatToEdit == "city")
        query.city = editValue;
    if (whatToEdit != "email") {
        user.collection.updateOne({ "username": username }, { $set: query },err=>{
            res.json({ "msg": '1' });
        });
        
    }
    else {
        user.findOne({"email":editValue},(err,mailExists)=>{
            if(err)
                console.log(err);
            else{
                if(mailExists)
                    res.json({"msg":0});
                else{
                    user.collection.updateOne({ "username": username }, { $set: query },err=>{
                        res.json({ "msg": '1' });
                    });
                }
            }
        })
    }
});

router.route('/changePassword').post((req, res) => {

    let newPassword = req.body.password;
    let username = req.body.username;

    user.collection.updateOne({ "username": username }, { $set: { "password": newPassword } });
    res.json({ "msg": "ok" });
});


router.post('/addNewRealEstate', upload.array("pictures"), (req, res) => {

    const files = (req as any).files;
    //console.log(files);
    var pictures = new Array(files.length);
    for (var i = 0; i < files.length; i++) {
        pictures[i] = files[i].filename;
    }
    var re = new realEstate();
    re.set("date", new Date());
    re.set("title", req.body.title);
    re.set("type", req.body.type);
    re.set("floors", req.body.floors);
    if (req.body.type == 'apartment')
        re.set("onFloor", req.body.onFloor);
    re.set("rooms", req.body.rooms);
    re.set("equiped", req.body.equiped);
    re.set("quadrature", req.body.quadrature);
    re.set("pictures", pictures);
    re.set("owner", req.body.owner);
    re.set("aproved", req.body.aproved);
    re.set("reason", req.body.reason);
    re.set("price", req.body.price);
    re.set("sold", false);
    re.set("views",0);
    re.set("viewed",[]);
    var adress = {
        "city": req.body.city,
        "state": req.body.state,
        "street": req.body.street
    }
    re.set("adress", adress);
    re.save().then(ok => {
        res.json({ "msg": "ok" });
    }).catch(err => {
        res.json({ "msg": "error" });
    });
});

router.route('/getRealEstateById').post((req, res) => {

    let id = ObjectId(req.body.id);

    realEstate.findOne({ '_id': id }, (err, re) => {
        if (err)
            console.log(err);
        else {
            res.json(re);
        }
    })

})

router.route('/promoteRealEstate').post((req, res) => {
    let id = req.body.id;
    var prom = new promoted();
    prom.set("realEstateID", id);
    prom.save().then(ok => {
        res.json({ "msg": "ok" })
    }).catch(err => {
        console.log(err);
    });
});



router.route('/removeFromPromoted').post((req, res) => {
    let id = req.body.id;
    promoted.deleteOne({ "realEstateID": id }, (err) => {
        console.log(err);
    });
});

router.route('/isPromoted').post((req, res) => {
    let id = req.body.id;
    promoted.findOne({ "realEstateID": id }, (err, re) => {
        if (err)
            console.log(err);
        else res.json(re);
    });
});

router.route('/aproveRealEstate').post((req, res) => {
    let id = ObjectId(req.body.id);

    realEstate.collection.updateOne({ "_id": id }, { $set: { "aproved": "yes" } }, (err, msg) => {
        if (err)
            console.log(err);
        else res.json({ "msg": "ok" });
    });
});

router.route('/getConversation').post((req, res) => {

    let sender = req.body.sender;
    let reciever = req.body.reciever;
    let realEstateId = ObjectId(req.body.realEstateId);

    conversation.findOne({ $and: [{ $or: [{ "buyer": sender }, { "buyer": reciever }] }, { $or: [{ "seller": sender }, { "seller": reciever }] }, { "realEstateId": realEstateId }] }, (err, conv) => {
        if (err) console.log(err);
        else {

            res.json(conv);
        }

    });
});

router.route('/sendMsg').post((req, res) => {
    let sender = req.body.sender;
    let reciever = req.body.reciever;
    let text = req.body.text;
    let title = req.body.title;
    let isAgency = req.body.isAgency;
    let senderSearch = sender;
    //all agents work under agency so all realEstates created by agents belong to agency
    //if sender is an agent, senderSearch is equal to agency
    if (isAgency)
        senderSearch = "agency";

    let realEstateId = ObjectId(req.body.realEstateId);
    let date = new Date(Date.now());
    var msg = {
        sender: sender,
        text: text,
        date: date
    }
    conversation.findOne({ $and: [{ $or: [{ "buyer": senderSearch }, { "buyer": reciever }] }, { $or: [{ "seller": senderSearch }, { "seller": reciever }] }, { "realEstateId": realEstateId }] }, (err, conv) => {
        if (err) console.log(err);
        else {
            if (conv) {

                if (reciever == conv.get("buyer")) {

                    conversation.collection.updateOne({ "_id": conv._id }, { $push: { "messages": msg }, $set: { "newestDate": date, "archivedByBuyer": false, "archivedBySeller": false, "seenBySeller": true, "seenByBuyer": false } }, err => {
                        conversation.findOne({ $and: [{ $or: [{ "buyer": senderSearch }, { "buyer": reciever }] }, { $or: [{ "seller": senderSearch }, { "seller": reciever }] }, { "realEstateId": realEstateId }] }, (err3, conv4) => {
                            if (err) console.log(err);
                            else {

                                res.json(conv4);
                            }

                        });
                    });
                }
                else {

                    conversation.collection.updateOne({ "_id": conv._id }, { $push: { "messages": msg }, $set: { "newestDate": date, "archivedByBuyer": false, "archivedBySeller": false, "seenBySeller": false, "seenByBuyer": true } }, err => {
                        conversation.findOne({ $and: [{ $or: [{ "buyer": senderSearch }, { "buyer": reciever }] }, { $or: [{ "seller": senderSearch }, { "seller": reciever }] }, { "realEstateId": realEstateId }] }, (err3, conv4) => {
                            if (err) console.log(err);
                            else {

                                res.json(conv4);
                            }

                        });
                    });

                }
            }
            else {

                var convSave = new conversation();
                convSave.set("buyer", senderSearch);
                convSave.set("seller", reciever);
                convSave.set("realEstateId", realEstateId);
                convSave.set("newestDate", date);
                convSave.set("title", title);
                convSave.set("archivedByBuyer", false);
                convSave.set("archivedBySeller", false);
                convSave.set("offerSent", false);
                convSave.set("seenByBuyer", true);
                convSave.set("seenBySeller", false);
                convSave.set("offerAccepted", false);
                convSave.set("aprovedByAgent", false);
                var msgs = [msg];


                convSave.set("messages", msgs);
                convSave.save(err => {
                    if (err) console.log(err);
                    else {
                        conversation.findOne({ $and: [{ $or: [{ "buyer": senderSearch }, { "buyer": reciever }] }, { $or: [{ "seller": senderSearch }, { "seller": reciever }] }, { "realEstateId": realEstateId }] }, (err3, conv4) => {
                            if (err) console.log(err);
                            else {

                                res.json(conv4);
                            }

                        });
                    }
                });

            }
        }
    });
});

router.route('/getActiveConversationsForUser').post((req, res) => {
    let username = req.body.username;
    conversation.find({ $or: [{ $and: [{ "buyer": username }, { "archivedByBuyer": false }] }, { $and: [{ "seller": username }, { "archivedBySeller": false }] }] }, (err, convs) => {
        if (err) console.log(err);
        else {
            res.json(convs);
        }
    });
});

router.route('/archiveConversation').post((req, res) => {

    let type = req.body.type;
    let id = ObjectId(req.body.id);
    if (type == 'Buyer')
        conversation.collection.findOneAndUpdate({ "_id": id }, { $set: { "archivedByBuyer": true } }, (err, doc) => {
            if (err)
                console.log(err);
            else {
                res.json(doc);
            }
        });
    else
        conversation.collection.findOneAndUpdate({ "_id": id }, { $set: { "archivedBySeller": true } }, (err, doc) => {
            if (err)
                console.log(err);
            else {
                res.json(doc);
            }
        });
});

router.route('/moveToActive').post((req, res) => {

    let type = req.body.type;
    let id = ObjectId(req.body.id);
    if (type == 'Buyer')
        conversation.collection.findOneAndUpdate({ "_id": id }, { $set: { "archivedByBuyer": false } }, (err, doc) => {
            if (err)
                console.log(err);
            else {
                res.json(doc);
            }
        });
    else
        conversation.collection.findOneAndUpdate({ "_id": id }, { $set: { "archivedBySeller": false } }, (err, doc) => {
            if (err)
                console.log(err);
            else {
                res.json(doc);
            }
        });
});

router.route('/getArchivedConversations').post((req, res) => {
    let username = req.body.username;
    conversation.find({ $or: [{ $and: [{ "buyer": username }, { "archivedByBuyer": true }] }, { $and: [{ "seller": username }, { "archivedBySeller": true }] }] }, (err, convs) => {
        if (err) console.log(err);
        else {
            res.json(convs);
        }
    });
});

router.route('/blockUser').post((req, res) => {
    let username = req.body.username;
    let blockUser = req.body.blockUser;
    let blockUserObj = {
        username: blockUser
    }
    user.updateOne({ 'username': username }, { $push: { 'blockList': blockUser } }, (err) => {
        if (err)
            console.log(err);
        else {
            conversation.find({ $or: [{ $and: [{ "buyer": username }, { "archivedByBuyer": false }, { 'seller': blockUser }] }, { $and: [{ "seller": username }, { "archivedBySeller": false }, { 'buyer': blockUser }] }] }, (err2, convs) => {
                if (err2) console.log(err2);
                else {
                    for (let conv of convs) {

                        if (conv.get("buyer") == username) {

                            conversation.updateOne({ "_id": ObjectId(conv._id) }, { $set: { "archivedByBuyer": true } }, err => {
                                if (err)
                                    console.log(err);
                            });
                        }
                        else {

                            conversation.updateOne({ "_id": ObjectId(conv._id) }, { $set: { "archivedBySeller": true } }, err => {
                                if (err)
                                    console.log(err);
                            });
                        }
                    }
                }


            });
        }
        res.json({ "msg": 1 });
    });
});

router.route('/unblockUser').post((req, res) => {


    let username = req.body.username;
    let blockedUserIndex = req.body.blockedUserIndex;
    user.updateOne({ 'username': username }, { $pull: { 'blockList': blockedUserIndex } }, (err) => {
        if (err)
            console.log(err);
        else res.json({ 'msg': '1' });
    });
});

router.route('/getBlockList').post((req, res) => {
    let username = req.body.username;
    if (username == 'agency')
        res.json(null);
    else {
        user.findOne({ 'username': username }, (err, user) => {
            if (err)
                console.log(err);

            else
                res.json(user.get("blockList"));


        });
    }
})

router.route('/sendOffer').post((req, res) => {
    let id = ObjectId(req.body.id);

    conversation.updateOne({ '_id': id }, { $set: { 'offerSent': true } }, (err) => {
        if (err) console.log(err);
        else
            res.json({ "msg": 1 });
    })

});

router.route('/acceptOffer').post((req, res) => {
    let id = ObjectId(req.body.id);
    let owner = req.body.owner;
    let idR = ObjectId(req.body.idR);
    let buyer = req.body.buyer;


    if (owner != 'agency') {
        conversation.updateOne({ '_id': id }, { $set: { 'offerAccepted': true } }, (err) => {
            if (err) { console.log(err); }
            else res.json({ "msg": 1 });
        });
    }
    else {

        conversation.updateOne({ '_id': id }, { $set: { 'offerAccepted': true, 'aprovedByAgent': true } }, (err) => {
            if (err) console.log(err);
            else {

                realEstate.updateOne({ '_id': idR }, { $set: { 'sold': true } }, (err2) => {
                    if (err2)
                        console.log(err2);
                    else {
                         res.json({ "msg": 1 });

                    }
                })

            }
        });

    }


});



router.route('/seen').post((req, res) => {
    let id = ObjectId(req.body.id);
    let buyerSeller = req.body.buyerSeller;
    if (buyerSeller == 'buyer') {

        conversation.updateOne({ '_id': id }, { $set: { 'seenByBuyer': true } }, (err) => {
            if (err) console.log(err);
            else
                res.json({ "msg": 1 });
        })
    }
    else {

        conversation.updateOne({ '_id': id }, { $set: { 'seenBySeller': true } }, (err) => {
            if (err) console.log(err);
            else
                res.json({ "msg": 1 });
        })
    }
});

router.route('/getPendingDeals').get((req, res) => {
    conversation.find({ "offerAccepted": true, "aprovedByAgent": false }, (err, pendingDeals) => {
        if (err)
            console.log(err);
        else {

            res.json(pendingDeals);
        }
    })
});
router.route('/declinePendingDeal').post((req, res) => {
    var id = ObjectId(req.body.id);
    conversation.updateOne({ "_id": id }, { $set: { "offerSent": false, "offerAccepted": false } }, (err) => {
        if (err) console.log(err);
        else
            res.json({ "msg": 1 });
    })
});
router.route('/aprovePendingDeal').post((req, res) => {
    var id = ObjectId(req.body.id);
    var idR = ObjectId(req.body.idR);

    conversation.updateOne({ "_id": id }, { $set: { "aprovedByAgent": true } }, (err) => {
        if (err) console.log(err);
        else {

            conversation.updateMany({ "realEstateId": idR, "offerAccepted": true, "aprovedByAgent": false }, { $set: { "offerSent": false, "offerAccepted": false } }, err1 => {
                if (err)
                    console.log(err1);
                else
                    realEstate.updateOne({ "_id": idR }, { $set: { "sold": true } }, err2 => {
                        if (err)
                            console.log(err2);
                        else {
                            realEstate.findOne({ "_id": idR }, (errre, re) => {

                                var price = re.get("price");
                                console.log(price);
                                profit.findOne({}, (errprof, prof) => {
                                    var totalRevenue = price * prof.get("agencyFee") / 100 + prof.get("totalRevenue");
                                    console.log(totalRevenue);
                                    profit.update({}, { $set: { "totalRevenue": totalRevenue } }, (err) => {
                                        if (err) console.log(err);
                                        else res.json({ "msg": 1 });
                                    });
                                });

                            });
                        }

                    })
            });


        }
    })
});

router.route('/getDoneDeals').get((req, res) => {

    conversation.find({ "aprovedByAgent": true }, (err, conversations) => {
        if (err)
            console.log(err);
        else {

            res.json(conversations);
        }
    })
})

router.route('/getProfit').get((req, res) => {
    profit.findOne({}, (err, prof) => {
        if (err)
            console.log(err);
        else {
            console.log(prof);
            res.json(prof);
        }
    })
});

router.route('/updateRealEstateInfo').post((req, res) => {
    var title = req.body.title;
    var floors = req.body.floors;
    var type = req.body.type;
    var rooms = req.body.rooms;
    var equiped = req.body.equiped;
    var quadrature = req.body.quadrature;
    var onFloor = req.body.onFloor;
    var reason = req.body.reason;
    var price = req.body.price;
    var adress = {
        "state": req.body.state,
        "city": req.body.city,
        "street": req.body.street

    }
    var id = ObjectId(req.body.id);
    if (type == 'house') {
        realEstate.updateOne({ "_id": id }, { $set: { "title": title, "floors": floors, "type": type, "rooms": rooms, "equiped": equiped, "quadrature": quadrature, "reason": reason, "price": price, "adress": adress } }, err => {
            if (err)
                console.log(err);
            else
                realEstate.findOne({ "_id": id }, (errHouse, re) => {
                    if (errHouse)
                        console.log(errHouse);
                    else
                        res.json(re);
                })

        })
    }
    else {
        realEstate.updateOne({ "_id": id }, { $set: { "title": title, "floors": floors, "type": type, "rooms": rooms, "equiped": equiped, "quadrature": quadrature, "reason": reason, "price": price, "adress": adress, "onFloor": onFloor } }, err => {
            if (err)
                console.log(err);
            else
                realEstate.findOne({ "_id": id }, (errHouse, re) => {
                    if (errHouse)
                        console.log(errHouse);
                    else
                        res.json(re);
                })

        })
    }
});

router.post('/changeRealEstatePictures', upload.array("pictures"), (req, res) => {
    console.log("12312312312");
    const files = (req as any).files;
    //console.log(files);
    var pictures = new Array(files.length);
    for (var i = 0; i < files.length; i++) {
        pictures[i] = files[i].filename;
    }
    console.log(pictures);
    var id=ObjectId(req.body.id);
    realEstate.updateOne({"_id":id},{$set:{"pictures":pictures}},err=>{
        res.json({"msg":1});
    });

})

router.route('/updateConversationTitles').post((req, res) => {
    var id = ObjectId(req.body.id);
    var title = req.body.title;
    conversation.updateMany({ "realEstateId": id }, { $set: { "title": title } }, (err) => {
        if (err)
            console.log(err);
        else
            res.json({ "msg": 1 });
    })
})

router.route('/updateFee').post((req,res)=>{
    console.log("serverfee");
    var fee=req.body.fee;
    profit.updateOne({},{$set:{"agencyFee":fee}},msg=>{
        console.log("serverfee2");
        res.json({"msg":1});
    })
});

router.route('/getAllUsers').get((req,res)=>{
    user.find({},(err,users)=>{
        res.json(users);
    })
});

router.route('/getUsersWaitingForAproval').get((req,res)=>{
    user.find({"aproved":false},(err,users)=>{
        console.log(users);
        res.json(users);
    })
});

router.route('/aproveUser').post((req,res)=>{
    let username=req.body.username;
    console.log(username);
    user.updateOne({"username":username},{$set:{"aproved":true}},err=>{
        
        res.json({"msg":1});
    })
});

router.route('/declineUser').post((req,res)=>{
    let username=req.body.username;
    user.deleteOne({"username":username},err=>{
        res.json({"msg":1});
    })
})

router.route('/addRealEstateFromFiles').post((req,res)=>{
    console.log(req.body);
    var re = new realEstate();
    re.set("date", req.body.date);
    re.set("title", req.body.title);
    re.set("type", req.body.type);
    re.set("floors", req.body.floors);
    if (req.body.type == 'apartment')
        re.set("onFloor", req.body.onFloor);
    re.set("rooms", req.body.rooms);
    re.set("equiped", req.body.equiped);
    re.set("quadrature", req.body.quadrature);
    re.set("pictures", req.body.pictures);
    re.set("owner", req.body.owner);
    re.set("aproved", req.body.aproved);
    re.set("reason", req.body.reason);
    re.set("price", req.body.price);
    re.set("sold", false);
    var adress = {
        "city": req.body.city,
        "state": req.body.state,
        "street": req.body.street
    }
    re.set("adress", adress);
    re.save().then(ok => {
        res.json({ "msg": "ok" });
    }).catch(err => {
        res.json({ "msg": "error" });
    });
});

router.route('/realEstateViews').post((req,res)=>{
    var idR = ObjectId(req.body.id);
    var username=req.body.username;

    realEstate.updateOne({"_id":idR},{$push:{"viewed":username},$inc:{"views":1}},err=>{
        res.json({"msg":1});
    })
    
});

router.route('/declineRealEstate').post((req,res)=>{
    var idR=ObjectId(req.body.id);
    realEstate.deleteOne({"_id":idR},err=>{
        res.json({"msg":1});
    })
})


















app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));