//Q1
{
const express=require('express')
const pool = require('./common/db/db')
const app = express()
app.use(express.json())


app.post('/products',async(req,res)=>{
    try{
        const {name,price,stock_quantity,supplier_id}=req.body

        const supplierCheck= await pool.query(`SELECT id  FROM suppliers WHERE id= $1`,[supplier_id])
        if(supplierCheck.rows.length===0){
            res.status(404).json({
                message:'supplier not found'
                ,success:false
            })
        }
    const {rows}= await pool.query(`INSERT INTO products(name,price,stock_quantity,supplier_id)VALUES($1,$2,$3,$4)
    RETURNING *`,
    [name,price,stock_quantity,supplier_id])
    res.status(201).json({
        message:'create products successfully',
        data: rows[0],
        success:true
    })
    
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: 'null',
            success:false
        })
        
    }
})
app.listen(5600,()=>{
    console.log('port rnning 5600');
    
})

}




//Q2
{  
const express =require('express')
const pool = require('./common/db/db')
const app= express()
app.use(express.json())
app.get('/products',async (req,res) => {
   try{
const {rows}= await pool.query(`SELECT * FROM products `)
   res.status(201).json({
    message:'retrived successfully',
    success:true,
    data: rows
   })

   }catch(err){
    console.log(err);
    res.status(404).json({
      message:'null',
      success:false
    })
    
   }
  
})
app.listen(6500,()=>{
  console.log('port running 6500');
  
})
}
  



// Q3
{
    const express =require('express')
const pool = require('./common/db/db')
const app= express()
app.use(express.json())
app.get('/products/:id',async (req,res) => {
  const id= req.params.id
   try{
const {rows}= await pool.query(`SELECT * FROM products WHERE id = $1`,[id])
if(rows.length===0){
  res.status(400).json({
    message:'products not found',
    success:false
  })
}
   res.status(201).json({
    message:'retrived successfully',
    success:true,
    data: rows[0]
   })

   }catch(err){
    console.log(err);
    res.status(404).json({
      message:'null',
      success:false
    })
    
   }
  
})
app.listen(9500,()=>{
  console.log('port running 9500');
  
})
}
//q4
{const express =require('express')
const pool = require('./common/db/db')
const app= express()
app.use(express.json())
app.patch('/products/:id',async(req,res)=>{
  const id = req.params.id
  const {name,price}= req.body
  const newProducts= await pool.query(`SELECT * FROM products WHERE id = $1`,[id])
  if(newProducts.rows.length===0){
  return  res.status(404).json({
      message:'product not found'
      ,success:false
    })
  }
  const {rows}=await pool.query(`UPDATE products SET name=$1,price=$2 WHERE id=$3 RETURNING id`
    ,[name,price,id])
    res.status(200).json({
      message:'updated successfully',
      success:true,
      data:rows[0]
    })
})

app.listen(8500,()=>{
  console.log('port running 8500');
  
})
}
//q5

{
      const express =require('express')
const pool = require('./common/db/db')
const app= express()
app.use(express.json())
app.delete('/products/:id',async(req,res)=>{
  const id = req.params.id
  const checkProducts= await pool.query(`SELECT * FROM products WHERE id = $1`,[id])
  if(checkProducts.rows.length===0){
  return  res.status(404).json({
      message:'product not found'
      ,success:false
    })
  }
  const {rows}=await pool.query(`DELETE FROM products WHERE id=$1`
    ,[id])
    res.status(200).json({
      message:'deleted  successfully',
      success:true,
      data:rows[0]
    })
})

app.listen(9500,()=>{
  console.log('port running 9500');
  
})
}
//q6
{const express =require('express')
const pool = require('./common/db/db')
const app= express()
app.use(express.json())

app.post('/suppliers',async(req,res)=>{
  const {name,contact_number}=req.body
  console.log(req.body);
  
  const checkSuppliers = await pool.query(`SELECT * FROM suppliers WHERE name=$1`,[name])
  if(checkSuppliers.rows.length!==0){
   return  res.status(409).json({
      message:'supplier already exist'
    })
  }
    const {rows}=  await pool.query(`INSERT INTO suppliers (name,contact_number) VALUES($1,$2) RETURNING *`
      ,[name,contact_number]
    )
    res.status(200).json({
      message:'create supplier done',
      data:rows[0],
      success:true 
    })

  
})
app.listen(5500,()=>{
  console.log('port running 5500');
  
})
}
//q7
{
    const express =require('express')
const pool = require('./common/db/db')
const app= express()
app.use(express.json())

app.get('/suppliers',async(req,res)=>{
  
const {rows}=await pool.query(`SELECT* FROM suppliers`)
res.status(200).json({
  message:'retrived successfully',
  data:rows,
  success:true
})
  
})
app.listen(4500,()=>{
  console.log('port running 5500');
  
})

}
//q8
{  
{
const express =require('express')
const pool = require('./common/db/db')
const app= express()
app.use(express.json())

app.patch('/suppliers',async(req,res)=>{
  const {name,cotact_number}= req.body
  const checkSuppliers= await pool.query(`SELECT * FROM suppliers `)
  if(checkSuppliers.rows.length===0){
    res.status(404).json({
      message:'suppliers not found'
    })
  }
const {rows}=await pool.query(`UPDATE suppliers SET name=$1,contact_number=$2`,[name,cotact_number])
res.status(200).json({
  message:'updated successfully',
  data:rows[0],
  success:true
})
  
})
app.listen(3500,()=>{
  console.log('port running 3500');
  
})

}
}
// q9
{
    
{
    const express =require('express')
const pool = require('./common/db/db')
const app= express()
app.use(express.json())

app.delete('/suppliers',async(req,res)=>{
  const {name,contact_number}= req.body
  const checkSuppliers= await pool.query(`SELECT * FROM suppliers  `)
  if(checkSuppliers.rows.length===0){
    res.status(404).json({
      message:'suppliers not found'
    })
  }
const {rows}=await pool.query(`DELETE FROM suppliers WHERE name = $1`,[name])
res.status(200).json({
  message:'deleted successfully',
  data:rows[0],
  success:true
})
  
})
app.listen(9600,()=>{
  console.log('port running 9600');
  
})

}
}
//q10

{
    const express =require('express')
const pool = require('./common/db/db')
const app= express()
app.use(express.json())
app.post('/sales',async(req,res)=>{
const {product_id,quantity_sold,sale_date}=req.body
const checkProducts= await pool.query(`SELECT * FROM products WHERE  id =$1`,
  [product_id])
if(checkProducts.rows.length===0){
   return res.status(409).json({
    message:"product not found"
  })

}
const {rows}= await pool.query(`INSERT INTO sales(product_id,quantity_sold,sale_date)VALUES($1,$2,$3)`,
  [product_id,quantity_sold,sale_date]
)
res.status(200).json({
  message:"create sales successfully",
  data:rows[0],
  success:true
})
})


app.listen(9600,()=>{
  console.log('port running 9600');
  
})

}
//q10

{
const express =require('express')
const pool = require('./common/db/db')
const app= express()
app.use(express.json())
app.get('/sales',async(req,res)=>{
const {rows} = await pool.query(`SELECT * FROM sales`)

res.status(200).json({
  message:"retrived  successfully",
  data:rows,
  success:true
})
})


app.listen(8600,()=>{
  console.log('port running 8600');
  
})

}
//q11

{
const express =require('express')
const pool = require('./common/db/db')
const app= express()
app.use(express.json())
app.get('/sales/:id',async(req,res)=>{
  const {id}=req.params
  console.log(id);
  
const {rows} = await pool.query(`SELECT * FROM sales  WHERE product_id=$1`,[id])
console.log(rows);

res.status(200).json({
  message:"retrived  successfully",
  data:rows,
  success:true
})
})


app.listen(7000,()=>{
  console.log('port running 7000');
  
})

}