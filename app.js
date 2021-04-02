const express = require("express");
const ejs = require("ejs"); 
const app = express();
const _ = require("lodash");

// showing dummy content on starting 
const homeStartingContent = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto, tenetur nisi cupiditate, eos saepe perferendis ex sequi, labore incidunt corporis non voluptatem excepturi veniam id quas debitis similique consequatur eligendi.";
const aboutContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem asperiores ad consectetur quibusdam consequatur! A nihil expedita porro totam veniam odio quasi eum tenetur explicabo officia. Quis eaque facere aperiam?";
const contactContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore iure labore, veniam alias ipsum et ducimus, nesciunt deleniti amet neque porro delectus in sunt facilis praesentium nostrum obcaecati odit." ;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
// global posts array
let posts = [];

app.get("/",(req,res)=>{
    res.render("home",{homeStartContent:homeStartingContent,
                        posts: posts
    });
});
app.get("/about",(req,res)=>{
    res.render("about",{aboutSampleText:aboutContent});
});
app.get("/contact-us",(req,res)=>{
    res.render("contact",{contactText:contactContent});
});
app.get("/compose",(req,res)=>{
    res.render("compose");
});
app.post("/compose",(req,res)=>{
    let postTitle = req.body.postTitle;
    let postContent = req.body.postBody;
    let post ={
        title: postTitle,
        content: postContent
    }
    posts.push(post);
    res.redirect("/");
    // res.render("home",{postTitleUI:post.title,postContentUI:post.content});
    
})
app.get("/post/:postName",(req,res)=>{
    let requestedPostRoute = _.kebabCase(req.params.postName);
    // str = str.trim().replace(" ","-").toLowerCase();
    // requestedPostRoute = requestedPostRoute.trim().split(" ").join("-").toLowerCase();
    posts.forEach(postContent =>{
        let titleOfPostContent = _.kebabCase(postContent.title);
        // console.log(titleOfPostContent);
        if (titleOfPostContent === requestedPostRoute){
        // console.log("match found");
        res.render("post",{postTitle : postContent.title ,postContent: postContent.content });
        }
    });  
});
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server started at 3000");
})