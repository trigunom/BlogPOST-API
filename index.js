import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Vegan Hamburgers",
    content: "Vegan Hamburgers February 1st 11:11pm WOW. I cannot believe that just happened. I went to AJ’s studio and almost walked out with a record deal. I was sober, too. He started rolling a joint and offered me some but I immediately said no.",
    author: "Ariana Tibi",
    date: "2024-02-01T10:00:00Z",
  },
  {
    id: 2,
    title: "6:47 PST",
    content: "What has four faces, eight arms, and can't tell time? The clock tower at Union Station. Four clocks on the tower and none of them run? I mean, what’re the odds? I peer up at the time and shade my eyes. It’s 6:47 pm. Always is, always will be. And all anyone knows is that on a Monday the world was a loud, frantic place and Tuesday it wasn't. ",
    author: "David Pampu",
    date: "2024-02-01T10:00:00Z",
  },
  {
    id: 3,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 4,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 5,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 5;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get('/posts', (req, res) => {
  //console.log(posts);
  res.json(posts);
});

//CHALLENGE 2: GET a specific post by id
app.get('/posts/:id', (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) res.sendStatus(404).json({message: "Post Not Found!"});
  res.json(post);
});

//CHALLENGE 3: POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId + 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.sendStatus(201).json(post);
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) res.sendStatus(404).json({message: "Post NOT fOUND"});

  if(req.body.title) post.title = req.body.title;
  if(req.body.content) post.content = req.body.content;
  if(req.body.author) post.author = req.body.author;

  res.json(post);
});  

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const searchIndex = posts.findIndex((p) => p.id === parseInt(req.params.id));

  if (searchIndex === -1) {
    res.status(404).json({ message: "Post not found!" });
  } else {
    // Check if the deleted post has the highest ID
    if (posts[searchIndex].id === lastId) {
      lastId = lastId - 1;
    }

    posts.splice(searchIndex, 1);
    res.json({ message: "Post deleted!" });
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
