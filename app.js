const express = require('express');
const app = express();
const { QueryTypes } = require('sequelize');
const User = require('./models/Implementao');
const db = require('./models/db');
app.use(express.json());

app.get("/:id", async(req,res) => {

    let colaborador = await User.sequelize.query(`SELECT 
    id,
    name,
    email
    FROM users WHERE id =${req.params.id}`, { type: QueryTypes.SELECT });

    return res.json({
        colaborador
    })
});
app.get("/cadastrar", async(req,res) => {
    res.send("Página inicial");
});
app.post("/cadastrar", async(req,res) => {
    await User.create(req.body)
    .then(()=> {
        return res.json({
            erro:false,
            mensagem:"Usuário cadastrado com sucesso"
        })
    }).catch(() => {
        return res.status(400).json({
            erro:true,
            mensagem:"Usuário cadastrado não sucesso"
        })
    })      
});
app.put('/:id', async (req, res) => {
    const { name, email } = req.body;
    try {
      const result = await User.update({ name, email }, {
        returning: true,
        where: { id: req.params.id }
      });
      const rowsUpdated = result[0];
      const updatedUsers = result[1];
      if (rowsUpdated === 0 || !updatedUsers || updatedUsers.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUsers[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  

app.listen(8080, () => {
    console.log("Servidor iniciado na porta http://localhost:8080")
})