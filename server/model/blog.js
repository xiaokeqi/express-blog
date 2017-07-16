var mongoose = require('./connect.js');

var Schema = mongoose.Schema;
var BlogSchema = new Schema({
    title: String,
    content: String,
    time: { type: Date, default: Date.now },
    etime: { type: Date, default: Date.now }
});
var Blog = mongoose.model("blog", BlogSchema);

module.exports = {
    insert: function(data, callback) {
        var blog = new Blog(data);
        blog.save(function(err, res) {
            if (err) {
                console.log("Error:" + err);
            } else {
                callback(res);
            }

        })
    },
    delete: function(whereObj, callback) {
        Blog.remove(whereObj, function(err, res) {
            if (err) {
                console.log("Error:" + err);
            } else {
                callback(res);
            }
        })
    },
    update: function(whereObj, updateObj, callback) {
        console.log(whereObj, updateObj);
        Blog.update(whereObj, updateObj, function(err, res) {
            if (err) {
                console.log("Error:" + err);
            } else {
                callback(res);
            }
        })
    },
    find: function(whereObj, callback) {
        Blog.find(whereObj, function(err, res) {
            if (err) {
                console.log("Error:" + err);
            } else {
                callback(res);
            }
        })
    }
};
