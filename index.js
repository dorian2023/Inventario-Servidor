const express = require('express');
const cors = require('cors');
const app = express();
const mysql =require('mysql')


app.use(cors());
app.use(express.json());

//CONSTANTE DE LA DB PARA ESTABLECER LA CONEXION A LA BD MYSQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "inventario_bellagio_ca"
})

//CREAR PRODUCTO
app.post("/create", (req,res)=>{
    //TOMANDO LOS DATOS DEL FORMULARIO
    const codigo = req.body.codigo;
    const pedido = req.body.pedido;
    const categoria = req.body.categoria;
    const descripcion = req.body.descripcion;
    const fechaE = req.body.fechaE;

    //CONSULTA A LA BD
    db.query("INSERT INTO inventario(codigo,pedido,categoria,descripcion,fechaE) VALUES(?,?,?,?,STR_TO_DATE(?, '%d/%m/%Y'))", [codigo,pedido,categoria,descripcion,fechaE],
    //PERSONALIZANDO RESPUESTA
    (err,result)=>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    }
    )
});

//TODOS LOS
app.get("/productos", (req,res)=>{
    //CONSULTA A LA BD
    db.query("SELECT * FROM inventario",
    //PERSONALIZANDO RESPUESTA
    (err,result)=>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    }
    )
});

//METODO BACKEN PARA ACTUALIZAR PRODUCTOS DE BASE DE DATOS
app.put("/actualizar",  (req,res)=>{
    //TOMANDO LOS DATOS DEL FORMULARIO
    const id = req.body.id;
    const codigo = req.body.codigo;
    const pedido = req.body.pedido;
    const categoria = req.body.categoria;
    const descripcion = req.body.descripcion;
    const fechaE = req.body.fechaE;

    //CONSULTA A LA BD PARA ACTUALIZAR POR MEDIO DEL ID DELPRODUCTO
    db.query("UPDATE inventario SET codigo=?,pedido=?,categoria=?,descripcion=?,fechaE=? WHERE id=?", [codigo,pedido,categoria,descripcion,fechaE,id],
    //PERSONALIZANDO RESPUESTA
    (err,result)=>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    }
    )
});

//METODO BACKEN PARA ELIMINAR PRODUCTOS DE BASE DE DATOS
app.delete("/eliminar/:codigo",  (req,res)=>{
    //TOMANDO LOS DATOS DEL FORMULARIO
    const codigo = req.params.codigo;
 
    //CONSULTA A LA BD PARA ACTUALIZAR POR MEDIO DEL ID DELPRODUCTO
    db.query("DELETE FROM inventario WHERE codigo=?", codigo,
    //PERSONALIZANDO RESPUESTA
    (err,result)=>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    }
    )
});


app.listen(3001, ()=>{
    console.log("Servidor corriendo en el puerto 3001")
})



//  [] {} <div className="App"></div>  ()=>{}