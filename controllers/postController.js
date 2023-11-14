const { log } = require("console");
const postsArray = require("../db/db.json");
const path = require("path");
const { kebabCase } = require("lodash");
const fs = require("fs");
const { loadavg } = require("os");

function index(req, res) {
  res.format({
    html: () => {
      let html = [`<h1>Post</h1><h3><a href="posts/create">Crea Post</a></h3>`];
      html.push("<ul>");
      for (const post of postsArray) {
        html.push(`<li><h3>${post.title}</h3></li>
                <li>${post.content}</li>
                <li><h5><a href="posts/${post.slug}">View</a></h5></li>
                <li><img src="imgs/posts/${post.image}" alt ="" style="width:400px" > </li>
                <li><h5>Tags: ${post.tags}</h5></li>
                `);
      }

      html.push("</ul>");
      res.type("html").send(html.join(""));
    },
    json: () => {
      res.type("json").send(postsArray);
    },
    default: () => {
      res.status(406).send("Not Acceptable");
    },
  });
  return;
  res.send("Post list");
}

function create(req, res) {
  res.format({
    html: () => {
      let html = ["<h1>Creazione nuovo post</h1>"];
      res.type("html").send(html.join(""));
    },
    default: () => {
      res.status(406).send("Not Acceptable");
    },
  });
  return;
}

function show(req, res) {
  // recupero lo slug dalla richiesta
  const postSlug = req.params.slug;
  const post = postsArray.find((post) => post.slug == postSlug);

  if (!post) {
    res.status(404).send(`Post con slug ${post.slug} non trovato`);
    return;
  }

  res.json(post);
}

function store(req, res) {
  res.format({
    html: () => {
      res.redirect("/");
    },
    default: () => {
      const dbPath = path.resolve(__dirname, "..", "db", "db.json");
      const postArray = require(dbPath);
      let slug = kebabCase(req.body.title);
      let count = 1;
      while (postArray.find((post) => post.slug === slug)) {
        slug = kebabCase(`${req.body.title}-${count}`);
        count += 1;
      }

      //aggiungo post al db
      postArray.push({
        ...req.body,
        slug: slug,
      });

      //converto db in json
      const json = JSON.stringify(postArray, null, 2);

      //scrivo json su file
      fs.writeFileSync(dbPath, json);
      res.json(postArray[postArray.length - 1]);
      console.log(postArray[postArray.length - 1]);
    },
  });
}

function destroy(req, res) {

    const dbPath = path.resolve(__dirname, '..', 'db', 'db.json');
    const postArray = require(dbPath);
  
    // Trova l'indice del post da eliminare
    const postIndex = postArray.findIndex((post) => post.slug == req.params.slug);
    console.log(postIndex);
  
    // Verifico se il post è stato trovato
    if (postIndex !== -1) {
      // Rimuovi il post dall'array
      postArray.splice(postIndex, 1);
      // Converto l'array in JSON
      const json = JSON.stringify(postArray, null, 2);
      // Riscrivo il file db.json
      fs.writeFileSync(dbPath, json);
      res.json(postArray);
    
    } else {

      // Se il post non è stato trovato, messaggio di errore
      res.status(404).json({ error: 'Post non trovato' });
    }
  }

function downloadImg(req, res) {
  const postSlug = req.params.slug;
  const post = postsArray.find((post) => post.slug == postSlug);

  if (!post) {
    res.status(404).send(`Post con slug ${post.slug} non trovato`);
    return;
  }

  let filePath = path.resolve(
    __dirname,
    "..",
    "public",
    "imgs",
    "posts",
    post.image
  );

  res.download(filePath);
}

module.exports = {
  index,
  show,
  create,
  store,
  downloadImg,
  destroy,
};
