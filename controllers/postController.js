const postsArray = require("../db/db.js");
const path = require("path")

function index(req,res){
    res.format({
        html: () => {
            
            let html = ["<h1>Post</h1>"]
            html.push("<ul>")
            for (const post of postsArray){
                html.push(`<li><h3>${post.title}</h3></li>
                <li>${post.content}</li>
                <li><h5><a href="posts/${post.slug}">View</a></h5></li>
                <li><img src="imgs/posts/${post.image}" alt ="" style="width:400px" > </li>
                <li><h5>Tags: ${post.tags}</h5></li>
                `)

            }

            html.push("</ul>")
            res.type("html").send(html.join(""))
        },
        json: () => {
            res.type("json").send(postsArray)
        },
        default: () =>{
            res.status(406).send("Not Acceptable")
        }
    })
    return;
    res.send("Post list")
}

function create(req,res){
    res.format({
        html: () => {
            
            let html = ["<h1>Creazione nuovo post</h1>"]
            res.type("html").send(html.join(""))
        },
        default: () =>{
            res.status(406).send("Not Acceptable")
        }
    })
    return;

}

function show(req,res){
    // recupero lo slug dalla richiesta
    const postSlug = req.params.slug;
    const post = postsArray.find( post => post.slug == postSlug);

    if(!post){
        res.status(404).send(`Post con slug ${post.slug} non trovato`);
        return
    }

    res.json(post);

}

function downloadImg(req,res){

    const postSlug = req.params.slug;
    const post = postsArray.find( post => post.slug == postSlug);

    if(!post){
        res.status(404).send(`Post con slug ${post.slug} non trovato`);
        return
    }

    let filePath = path.resolve(__dirname, "..", "public", "imgs", "posts", post.image)

    res.download(filePath);

}


module.exports = {
    index,
    show,
    create,
    downloadImg,
}