// const express = require('express');
// const router = express.Router();
const mongoose = require('mongoose');
const Quote = require('../models/Quote')


module.exports = app => {

    app.get(`/`, (req, res) => {
        res.render('index');
    })

    app.get(`/quotes`, (req, res) => {
        console.log("fetching all quotes");

        mongoose.model('Quote').find((err, quotes) => {
            res.send(quotes);
        })
    })

    app.post(`/quotes/create`, (req, res) => {
        console.log("posting a new quote");
        const quote = new Quote({
            quote: req.body.quote,
            author: req.body.author
        });

        quote.save().then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
        res.sendStatus(200);
    })

    // * DELETE A USER FROM DB
    app.delete(`/quotes/destroy/:quoteId`, (req, res) => {
        console.log("deleting a quote");
        console.log(req.body);
        let id = req.params.quoteId;

        Quote.findOneAndDelete({
            _id: id
        }, (err) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log("quote deleted");
            res.sendStatus(200);
        })
    })

    app.get(`/quote/:quoteId`, (req, res) => {
        console.log("fetching a quote");
        console.log(req.body);
        let id = req.params.quoteId;

        Quote.find({
            _id: id
        }).then(result => {
            console.log(result);
            res.send(result);
        })
    })

    app.put(`/quotes/update/:quoteId`, (req, res) => {
        console.log("updating a quote");
        let id = req.params.quoteId;

        Quote.findOneAndUpdate({
            _id: id
        }, {
            quote: req.body.quote,
            author: req.body.author
        }, err => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log("quote updated");
            res.sendStatus(200);
        })
    })
};