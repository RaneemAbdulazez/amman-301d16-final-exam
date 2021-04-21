const express = require("express");
const pg = require("pg");
const methodOverride = require("method-override");
const superagent = require("superagent");
const { urlencoded } = require("express");
// const { delete } = require("superagent");
// const { get } = require('superagent');


require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// Specify a directory for static resources
app.use(express.static("public"));

// define our method-override reference
app.use(methodOverride("_method"));

// Set the view engine for server-side templating
app.set('view engine', 'ejs');
// Use app cors
// app.use('cors')

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);



app.get("/", renderHome);
app.post('/favorite-quotes',favo)
app.get('/favorite-quotes',favorender)
app.get('/favorite-quotes/:id',details)
app.delete("/favorite-quotes/:id",deletecahe)


// quote VARCHAR(256) ,
// character_s VARCHAR(256) ,
// imageurl VARCHAR(256),
// characterDirection  VARCHAR(256)

function deletecahe(req,res){
    const id=req.params.id;
    console.log(id)

    const sql=`DELETE FROM simpsons WHERE id=$1;`

    const Val=[id]
    client.query(sql,Val).then(

    res.redirect('/favorite-quotes')
    

        
    )

}

        
    



function details(req,res){
const id=req.params.id
// console.log(id)
    const sql=`SELECT *FROM simpsons WHERE id=$1;`

    const Val=[id]
    client.query(sql,Val).then(sips=>{

        res.render('details',{simps:sips.rows})

    }

        
    )

}

function favorender(req,res){

    const sql=`SELECT * FROM simpsons WHERE source=$1;`

    const Val=['api']
    client.query(sql,Val).then(sips=>{
        console.log("rows",sips.rows)

        res.render('fav',{simps:sips.rows})

    }

        
    )


}
function favo(req,res){
    
let  {quote,character_s,imageurl,characterDirection}=req.body
    // console.log("-------------------------",req.body)
    const sql=`INSERT INTO simpsons(quote,character_s,imageurl,characterDirection,source) VALUES($1,$2,$3,$4,$5);`

    const VALUES=[quote,character_s,imageurl,characterDirection,'api']
    // console.log(VALUES,"--------vals")
    
    client.query(sql,VALUES).then(
        

        res.redirect('/favorite-quotes')
    )


}


function renderHome(req, res) {
    // res.render('index')

    let url = 'https://thesimpsonsquoteapi.glitch.me/quotes?count=10'

    superagent.get(url).set('User-Agent', '1.0').then(result => {
        const apiarray = result.body.map(info => new Sipms(info));
        // console.log(apiarray)
        res.render('index',{simps:apiarray})

    }

    )

}



function Sipms(info) {
    this.quote = info.quote;
    this.image = info.image;
    this.character = info.character;
    this.characterDirection = info.characterDirection;

}


client
    .connect()
    .then(() =>
        app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
    );
