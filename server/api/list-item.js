const router = require('express').Router();
const { ListItem, Trip } = require('../db/models');

router.get('/', async (req, res, next) => {
    try {
        const userId = req.user.id;
        const listItems = await ListItem.findAll({
            where: {
                userId
            }
        });
        res.json(listItems);
    } catch (err) {
        next(err);
    }
});

/* 
create list item for buyer (no subscribers yet) for new trip
create new list item request for subscriber + buyer on existing trip
update list item availability for buyer + create new list item for new subscriber
update pending list items once accepted
*/

// adding new list item for buyer
// requesting new list item on existing trip for subscriber + adding item request to buyer's list
router.post('/', async (req, res, next) => {
    try {
        const tripId = req.body.tripId;
        const userId = req.user.id;
        const buyerId = await Trip.findByPk(tripId).buyerId;
        const name = req.body.name;
        const qtyTotal = req.body.qtyTotal;
        const qtyAvailable = req.body.qtyAvailable;
        const unitType = req.body.unitType;
        if (userId === buyerId) {
            const newBuyerItem = await ListItem.create({
                tripId,
                userId,
                type: 'buyer',
                name,
                qtyTotal,
                qtyAvailable,
                unitType,
                isAccepted: 'approved'
            });
            res.json(newBuyerItem);
        } else {
            const newBuyerItem = await ListItem.create({
                tripId,
                userId: buyerId,
                type: 'buyer',
                name,
                qtyTotal, // is this total requested by subscriber or total available?
                // qtyAvailable, // do we show availability on buyer's card if subscriber is requesting item and won't have that info?
                unitType,
                isAccepted: 'approved'
            });
            const newSubscriberItem = await ListItem.create({
                tripId,
                userId,
                type: 'subscriber',
                name,
                qtyTotal, // is this the total # of items the subscriber is requesting?
                // qtyAvailable, // is there a qtyAvailable if the subscriber is requesting the item?
                unitType,
                isAccepted: 'pending'
            });
            res.json({ newBuyerItem, newSubscriberItem });
        }
    } catch (err) {
        next(err);
    }
});

// updating pending status once approved
// updating existing list item with new subscribers (subscribers are automatically approved in this instance)
router.put('/:id', async (req, res, next) => {
    const listItemId = req.params.id;
    const tripId = req.body.tripId;
    const userId = req.user.id;
    const buyerId = await Trip.findByPk(tripId).buyerId;
    // const price = req.body.price; // deal with after trip finishes
    const qtyTotal = req.body.qtyTotal; // here refers to qty requested by subscriber
    const qtyAvailable = req.body.qtyAvailable;
    const isAccepted = req.body.isAccepted;
    // const amountDue = req.body.amountDue; // deal with after trip finishes
    try {
        const listItem = await ListItem.findByPk(listItemId);
        if (isAccepted === 'approved') {
            const approvedSubscriberItem = await listItem.update({
                isAccepted
            });
            res.json(approvedSubscriberItem);
        } else {
            const updatedBuyerItem;
            const newSubscriberItem;
            if (userId === buyerId) {
                updatedBuyerItem = await listItem.update({
                    qtyAvailable: qtyAvailable - qtyTotal
                });
            }
            if (userId !== buyerId ) {
                newSubscriberItem = await ListItem.create({
                    tripId,
                    userId,
                    type: 'subscriber',
                    name: listItem.name,
                    // qtyAvailable, // default to 0?
                    qtyTotal,
                    unitType: listItem.unitType,
                    isAccepted: 'approved'
                });
            }
            res.json({ updatedBuyerItem, newSubscriberItem }); // send both back?
        }
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const listItem = await ListItem.findByPk(id);
        if (listItem) {
            await listItem.destroy();
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;