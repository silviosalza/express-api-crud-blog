const express = require("express")
const fs = require("fs");
const path = require("path")


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express-serve-static-core").Response} res 
 * @returns 
 */

function index(req,res){

        res.format({
            text: () => {
                res.type("text").send("Benvenuto nel mio blog sull'arte nipponica!")
            },
            html: () => {
                let htmlContent = fs.readFileSync(path.resolve(__dirname,"../index.html"), "utf-8")
                let navbar = fs.readFileSync(path.resolve(__dirname,"../navbar.html"), "utf-8")

                htmlContent = htmlContent.replace("@navbar", navbar)
                res.type("html").send(htmlContent)
            },
            json: () => {
                res.type("json").send({message: "Benvenuto nel mio blog!"})
            },
            default: () =>{
                res.status(406).send("Not Acceptable")
            }
        })
        return;
        res.send("Funziona")
    }

module.exports = {
    index,
}