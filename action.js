var express = require("express");
var app = express();
var path = require('path'); 
var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
var MongoClient=require("mongodb").MongoClient;
var url="mongodb://localhost:27017/";
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);

app.get("/index",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
})

app.get("/student_sign_in.html",function(req,res)
{
    res.sendFile(__dirname+"/student_sign_in.html");
})

app.get("/Faculty_index.html",function(req,res)
{
    res.sendFile(__dirname+"/Faculty_index.html");
})

app.get("/faculty_sign_in.html",function(req,res)
{
    res.sendFile(__dirname+"/faculty_sign_in.html");
})

app.get("/domain_register.html",function(req,res)
{
    res.sendFile(__dirname+"/domain_register.html");
})

app.get("/post_register.html",function(req,res)
{
    res.sendFile(__dirname+"/post_register.html");
})

app.get("/faculty_home_page.html",function(req,res)
{
    res.sendFile(__dirname+"/faculty_home_page.html");
})

app.get("/create_test.html",function(req,res)
{
    res.sendFile(__dirname+"/create_test.html");
})

app.get("/view_submissions.html",function(req,res)
{
    res.sendFile(__dirname+"/view_submissions.html");
})

app.get("/register_students.html",function(req,res)
{
    res.sendFile(__dirname+"/register_students.html");
})

app.post("/post_register.html",function(req,res)
{
    MongoClient.connect(url,function(err,db)
    {
        if(err) throw err;
        var dbo=db.db("example");
        dbo.collection("stuff").insertOne(req.body);
    })
    console.log(req.body);
    res.redirect("/post_register.html");
});

app.post("/faculty_home_page.html",function(req,res)
{
    var user=req.body.username;
    var pass=req.body.password;
    MongoClient.connect(url,function(err,db)
    {
        if(err) throw err;
        var dbo=db.db("example");
        dbo.collection("stuff").findOne({facu:user},function(err,result)
        {
            if(err) throw err;

            if(result)
            {
                if(result.password===pass)
                {
                    res.redirect("/faculty_home_page.html");
                }
                res.end("wrong password");
            }
            db.close();
        });
    });
});

app.post("/registered",function(req,res)
{
    MongoClient.connect(url,function(err,db)
    {
        if(err) throw err;
        var dbo=db.db("student");
        dbo.collection("entry").insertOne(req.body);
    })
    console.log(req.body);
    res.end("done");
})

app.post("/signed_in",function(req,res)
{
    var stu_id=req.body.id;
    var stu_pass=req.body.password;
    MongoClient.connect(url,function(err,db)
    {
        if(err) throw err;
        var dbo=db.db("student");
        dbo.collection("entry").findOne({id:stu_id},function(err,result)
        {
            if(err) throw err;

            if(result)
            {
                if(result.password===stu_pass)
                {
                    res.end("signed in");
                }
                res.end("wrong password");
            }
            db.close();
        });
    });
})

app.post("/create_test.html",function(req,res)
{
    MongoClient.connect(url,function(err,db)
    {
        if(err) throw err;
        var dbo=db.db("test");
        dbo.collection("question").insertOne(req.body);
    })
    console.log(req.body);
    res.redirect("/create_test.html");
})