var express = require('express');
var router = express.Router();
var UserModel = require('../models').User;
var BookModel = require('../models').Book;
var ListModel = require('../models').List;
var DetailModel = require('../models').Detail;
var MESSAGE = require('./config').MESSAGE;
var KEY = require('./config').KEY;

/* books/show_books */
router.post('/show_books', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.body.page == undefined || req.body.page == ''
        || req.body.timestamp == undefined || req.body.timestamp == ''
        || req.body.token == undefined || req.body.token == ''
        || req.body.uid == undefined || req.body.uid == '') {
        res.json({status: 1, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    console.log('POST: books/show_books');
    console.log('TIME: ' + getNowFormatDate());
    console.log('page: ' + req.body.page);
    console.log('timestamp: ' + req.body.timestamp);
	console.log('token: ' + req.body.token);
    console.log('uid: ' + req.body.uid);

    BookModel.findAll({}).then(function (result) {
    	var totalPages = 0;
        var pageSize = 10;
        var num = result.length;
        
        if (num / pageSize > parseInt(num / pageSize)) {
            totalPages = parseInt(num / pageSize) + 1;
        } else {
            totalPages = parseInt(num / pageSize);
        }

        var currentPage = req.body.pages;
        var startRow = (currentPage - 1) * pageSize;
        var endRow = currentPage * pageSize;
        endRow = (endRow > num) ? num : endRow;

        var books = [];
        var i = 0;

        result.forEach(function (book) {
            var bookData = {};
            bookData.book_id = book.id;
            bookData.book_cover = book.book_cover;
            bookData.book_author = book.book_author;
            bookData.book_last_number = book.book_last_number;
            bookData.book_rate = book.book_rate;
            bookData.book_publish = book.book_publish;
            bookData.book_title = book.book_title;

            if (i >= startRow && i <= endRow) {
                books.push(bookData);
            }
            i++;
        });
        res.json({status: 0, data: books, msg: MESSAGE.SUCCESS});
    }).catch(next);

    return;
});

/* books/search_book */
router.post('/search_book', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.body.content == undefined || req.body.content == ''
        || req.body.timestamp == undefined || req.body.timestamp == ''
        || req.body.token == undefined || req.body.token == ''
        || req.body.uid == undefined || req.body.uid == ''
        || req.body.type == undefined || req.body.type == '') {
        res.json({status: 1, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    console.log('POST: books/search_book');
    console.log('TIME: ' + getNowFormatDate());
    console.log('timestamp: ' + req.body.timestamp);
	console.log('token: ' + req.body.token);
    console.log('uid: ' + req.body.uid);
    console.log('content: ' + req.body.content);
    console.log('type: ' + req.body.type);

    if (type == 0) {
    	BookModel.findAll({
    		where: {
            	book_title: {
            		'$like': '%' + req.body.content + '%', 
        		}
        	}
    	}).then(function (result) {
    		var books = [];
    		result.forEach(function (book) {
	            var bookData = {};
	            bookData.book_id = book.id;
	            bookData.book_cover = book.book_cover;
	            bookData.book_author = book.book_author;
	            bookData.book_last_number = book.book_last_number;
	            bookData.book_rate = book.book_rate;
	            bookData.book_publish = book.book_publish;
	            bookData.book_title = book.book_title;
	            books.push(bookData);
	        });
            res.json({status: 0, data: books, msg: MESSAGE.SUCCESS});
    	}).catch(next);
		return;
    } else if (type == 1) {
    	BookModel.findAll({
    		where: {
            	book_author: {
            		'$like': '%' + req.body.content + '%', 
        		}
        	}
    	}).then(function (result) {
    		var books = [];
    		result.forEach(function (book) {
	            var bookData = {};
	            bookData.book_id = book.id;
	            bookData.book_cover = book.book_cover;
	            bookData.book_author = book.book_author;
	            bookData.book_last_number = book.book_last_number;
	            bookData.book_rate = book.book_rate;
	            bookData.book_publish = book.book_publish;
	            bookData.book_title = book.book_title;
	            books.push(bookData);
	        });
            res.json({status: 0, data: books, msg: MESSAGE.SUCCESS});
        }).catch(next);
    	return;
    } else if (type == 2) {
    	BookModel.findAll({
    		where: {
            	book_publish: {
            		'$like': '%' + req.body.content + '%', 
        		}
        	}
    	}).then(function (result) {
    		var books = [];
    		result.forEach(function (book) {
	            var bookData = {};
	            bookData.book_id = book.id;
	            bookData.book_cover = book.book_cover;
	            bookData.book_author = book.book_author;
	            bookData.book_last_number = book.book_last_number;
	            bookData.book_rate = book.book_rate;
	            bookData.book_publish = book.book_publish;
	            bookData.book_title = book.book_title;
	            books.push(bookData);
	        });
            res.json({status: 0, data: books, msg: MESSAGE.SUCCESS});
    	}).catch(next);
    	return;
    }
    return;
});

/* books/show_detail */
router.post('/show_detail', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.body.book_id == undefined || req.body.book_id == ''
        || req.body.timestamp == undefined || req.body.timestamp == ''
        || req.body.token == undefined || req.body.token == ''
        || req.body.uid == undefined || req.body.uid == '') {
        res.json({status: 1, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    console.log('POST: books/show_detail');
    console.log('TIME: ' + getNowFormatDate());
    console.log('timestamp: ' + req.body.timestamp);
	console.log('token: ' + req.body.token);
    console.log('uid: ' + req.body.uid);
    console.log('book_id: ' + req.body.book_id);

    BookModel.findOne({
    	include:[DetailModel],
    	where: {
    		book_id: req.body.book_id
    	}
    }).then(function (result) {
    	var book = {};
    	book.book_author = result.book_author;
    	book.book_content = result.book_content;
    	book.book_cover = result.book_cover;
    	book.book_id = result.id;
    	book.book_key = result.book_key;
    	book.book_last_number = result.book_last_number;
    	book.book_place = result.book_place;
    	book.book_publish = result.book_publish;
    	book.book_rate = result.book_rate;
    	book.book_title = result.book_title;
    	book.is_subscribe = 0;
    	book.detail_data = {};
    	book.detail_data.detail_id = result.detail_data.id;
    	book.detail_data.detail_key = result.detail_data.detail_key;
    	book.detail_data.detail_place = result.detail_data.detail_place;
    	book.detail_data.is_borrowed = result.detail_data.is_borrowed;
    	return res.json({status: 0, msg: MESSAGE.SUCCESS, data: book});
    }).catch(next);

    return;
});

module.exports = router;
