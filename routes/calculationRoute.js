/**
 * Created by chelsea on 5/12/15.
 */
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Calculator = require('../models/calculation');

router.get('/', function(request, response, next){
    Calculator.find(function(err, data) {
        response.json(data);
    });
});

router.post('/', function(request, response, next) {
    Calculator.create(request.body, function(err, post) {
        response.json(post);
    });
});

router.put('/:id', function(req, res, next) {
    Calculator.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
    Calculator.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;