require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
// authentication error on adding dotenv to mongoose connection
// mongoose.connect("mongodb+srv://process.env.USERNAME:process.env.PASSWORD@cluster0.vmdiy.mongodb.net/posts", {
    // local database below
mongoose.connect("mongodb://localhost:27017/posts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const _ = require("lodash");

// showing dummy content on starting
const homeStartingContent =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto, tenetur nisi cupiditate, eos saepe perferendis ex sequi, labore incidunt corporis non voluptatem excepturi veniam id quas debitis similique consequatur eligendi.";
// const aboutContent ="<h2>I'm Faiz</h2>";
const contactContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore iure labore, veniam alias ipsum et ducimus, nesciunt deleniti amet neque porro delectus in sunt facilis praesentium nostrum obcaecati odit.";

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// creating schema of post db
const post = {
  title: String,
  content: String,
};
// creating collections
const Post = mongoose.model("Post", post);
// global posts array
let posts = [];

app.get("/", (req, res) => {
  Post.find({}, (err, foundItem) => {
    if (!err) {
      res.render("home", {
        homeStartContent: homeStartingContent,
        posts: foundItem,
      });
    }
  });
});
app.get("/about", (req, res) => {
  res.render("about"
//   , { aboutSampleText: aboutContent }
  );
});
app.get("/contact-us", (req, res) => {
  res.render("contact");
});
app.get("/compose", (req, res) => {
  res.render("compose");
});
app.post("/compose", (req, res) => {
  let postTitle = req.body.postTitle;
  let postContent = req.body.postBody;
  const post = new Post({
    title: postTitle,
    content: postContent,
  });
  // posts.push(post);
  post.save();
  res.redirect("/");
  // res.render("home",{postTitleUI:post.title,postContentUI:post.content});
});
app.get("/post/:postName/:_id", (req, res) => {
  let requestedPostRoute = _.kebabCase(req.params.postName);
  const id = req.params._id;
//   console.log(id);
  // str = str.trim().replace(" ","-").toLowerCase();
  // requestedPostRoute = requestedPostRoute.trim().split(" ").join("-").toLowerCase();
  Post.findOne({_id: id},(err,foundPost)=>{
      
      if(!err){
        res.render("post", {
            postTitle: foundPost.title,
            postContent: foundPost.content,
          });
      }else
      console.log("Not found");
  })
//   posts.forEach((postContent) => {
//     let titleOfPostContent = _.kebabCase(postContent.title);
//     // console.log(titleOfPostContent);
//     if (titleOfPostContent === requestedPostRoute) {
//       // console.log("match found");
//       res.render("post", {
//         postTitle: postContent.title,
//         postContent: postContent.content,
//       });
//     }
//   });
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started at 3000");
});
